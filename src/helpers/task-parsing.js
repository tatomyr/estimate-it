import { I, product, toProbGraph } from './equiprobabilistic-rows'

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

// getParent :: ?
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
  // TODO: add hashtags: /#\w/g (?)
  // TODO: add ∑ (?)
)

// splitNameAndHours :: String -> {name: String, hours: [Number]}
const splitNameAndHours = str => {
  const [name, hours = ''] = str.split(/[=|]/)
  return ({
    name: name.trim(),
    hours: hours.trim().split(/\s+/).map(time => +time),
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

// TODO: calculateHours :: …
const calculateHours = (list, rounding) => ({ index, hours }) => {
  const children = list.filter(item => item.parent === index)
  console.log(index,'-->',children)
  if (children.length === 0) return hours

  return children.reduce(($, item) => product(
    $,
    calculateHours(list, rounding)(item),
    rounding,
  ), I)
}

const hoistHours = (list, rounding) => list
  .map(item => ({
    ...item,
    // hours: calculateHours(list, rounding)(item.index),
    hours: calculateHours(list, rounding)(item),
  }))
  .map(item => ({
    ...item,
    value: (`${item.name} | ${item.hours.join(' ')}`).trim(),
  }))

export const listToTree = list => text => textToArr(text).map(item => {
  const newItem = list.find(({ index }) => index === item.index)
  return Array(item.indentation + 1).join(' ') + (newItem || item).value
}).join('\n')

const summary = ({
  index: null,
  name: '∑',
})

export const handleFlat = (text, rounding) => {
  const tasks = treeToList(text)
  console.table(tasks.map(item => ({ ...item, hours: JSON.stringify(item.hours) })))
  const activeTasks = tasks
    .filter(({ value }) => !value.startsWith('# '))
  const tasksWithCorrectHours = hoistHours([...activeTasks, summary], rounding)
  console.table(tasksWithCorrectHours.map(item => ({ ...item, hours: JSON.stringify(item.hours) })))
  console.log(listToTree(tasksWithCorrectHours)(text))
  console.log(tasksWithCorrectHours)
  const summaryHours = tasksWithCorrectHours.find(({ index }) => index === null).hours
  console.log('∑',summaryHours)
  return ({
    text: listToTree(tasksWithCorrectHours)(text),
    graphData: toProbGraph(summaryHours),
  })
}
