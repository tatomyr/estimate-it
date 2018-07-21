import {
  O,
  I,
  convolution,
  toProbGraph,
  sort,
} from './equiprobabilistic-rows'

const defaultRounding = 100

// getIndentation :: String -> Int
const getIndentation = str => str.match(/^\s*/)[0].length

// lineToRecord :: (String, Int) -> {value: String, indentation: Int, index: Int}
const lineToRecord = (str, index) => ({
  value: str.trim(),
  indentation: getIndentation(str),
  index,
})

// textToArr :: String -> [{value: String, indentation: Int, index: Int}]
const textToArr = text => text.split('\n').map(lineToRecord)

// last :: [a] -> Int
const last = arr => arr[arr.length - 1]

const getParent = arr => indentation => sibling => {
  if (sibling === undefined) {
    if (arr.length === 0) return null
    throw new Error('Invalid tree structure!')
  }
  if (indentation === sibling.indentation) {
    return sibling.parent
  }
  if (indentation > sibling.indentation && sibling === last(arr)) {
    return sibling.index
  }
  return getParent(arr)(indentation)(arr.find(item => item.index === sibling.parent))
}

// isTaskItem :: {value: String, *} -> Boolean
const isTaskItem = ({ value }) => (
  value.trim()
  && value.trim()[0] !== '@'
  && value.trim()[0] !== '%'
)

// parseNumber :: (Number | String) -> Numbers
const parseNumber = x => +x

// splitNameAndHours :: String -> {name: String, hours: [Number]}
const splitNameAndHours = str => {
  const [name, hours = ''] = str.split(/[=|]/)
  return ({
    name: name.trim(),
    hours: sort(hours.trim().split(/\s+/).map(parseNumber)),
  })
}

// treeToList => String => [{value: String, indentation: Int, index: Int, parent: Int}]
const treeToList = text => textToArr(text)
  .filter(isTaskItem)
  // Go through all tasks to define parent-child relationship
  // The only reason I need the `reduce` method instead of `map`…
  // …is that I should be able to access the previously processed part of the list ($)
  .reduce(($, item) => [
    ...$,
    {
      ...item,
      parent: getParent($)(item.indentation)(last($)),
    },
  ], [])
  // Splitting task description into a task name and an estimated hours
  .map(item => ({
    ...item,
    ...splitNameAndHours(item.value),
  }))

// calculateHours :: ([{index: Int, parent: Int, *}], Int) -> [Number]
const calculateHours = (list, rounding) => ({ index, hours }) => {
  const children = list.filter(item => item.parent === index)
  if (children.length === 0) return hours
  return children.reduce(($, item) => convolution(
    $,
    calculateHours(list, rounding)(item),
    rounding,
  ), I)
}

// hoistHours :: ([{a}], Int) -> [{a, value: String}]
const hoistHours = (list, rounding) => list
  .map(item => ({
    ...item,
    hours: calculateHours(list, rounding)(item),
  }))
  // Preventing @summary from being undefined
  .map(item => ({
    ...item,
    hours: item.hours || O,
  }))
  .map(item => ({
    ...item,
    value: (`${item.name} = ${item.hours.join(' ')}`).trim(),
  }))

// withIndent :: {value: String, indentation: Int} -> String
const withIndent = ({ value, indentation = 0 }) => `${' '.repeat(indentation)}${value}`

export const listToTree = list => text => textToArr(text).map(item => {
  const newItem = list.find(({ index }) => index === item.index)
  // Print summary if directive `@summary` met
  const summaryItem = item.value.startsWith('@summary')
    && list.find(({ index }) => index === null)
  return withIndent(summaryItem || newItem || item)
}).join('\n')

// Default summary item has `null` key
const summary = ({
  index: null,
  name: '@summary',
})

// parseParam :: String -> String -> String
export const parseParam = text => param => (
  textToArr(text).find(({ value }) => value.startsWith(param))
  || { value: '' }
).value.replace(param, '').trim()

export const handleText = text => {
  const getParam = parseParam(text)
  const rounding = +getParam('@rounding') || defaultRounding
  const tasks = treeToList(text)
  const activeTasks = tasks
    .filter(({ value }) => !value.startsWith('# '))

  const tasksWithCorrectHours = hoistHours([...activeTasks, summary], rounding)
  console.table(tasksWithCorrectHours.map(item => ({ ...item, hours: JSON.stringify(item.hours) })))
  const summaryHours = tasksWithCorrectHours.find(({ index }) => index === null).hours
  return ({
    text: listToTree(tasksWithCorrectHours)(text),
    graphData: toProbGraph(summaryHours),
  })
}
