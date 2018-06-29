import {
  sort,
  product,
  productEach,
  reduceByEdges,
  toProbGraph,
} from 'augmented-multiset'

// import { product } from './equiprobabilistic-rows'

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
  // TODO: add hashtags: /#\w/g
  // TODO: add ∑
)

// treeToList => String => [{value: String, indentation: Int, index: Int, parent: Int}]
export const treeToList = text => textToArr(text)
  .filter(isTaskItem)
  // The only reason I need reduce method instead of map...
  // ...is that I should be able to access the previously processed part of the list ($)
  .reduce(($, item) => [
    ...$,
    { ...item, parent: getParent($)(item.indentation)(last($)) },
  ], [])

// splitNameAndHours :: String -> {name: String, hours: [Number]}
const splitNameAndHours = str => {
  const [name, hours = ''] = str.split(/[=|]/)
  return ({
    name: name.trim(),
    hours: hours.trim().split(/\s+/).map(time => +time),
  })
}

// splitTaskParams :: [{value: String, *}] -> [{value: String, name: String, hours: [Number], *}]
export const splitTaskParams = list => list.map(item => ({
  ...item,
  ...splitNameAndHours(item.value),
}))

export const hoistHours = list => list
  .map(item => ({
    ...item,
    hours: calculateHours(list)(item.index).sort((a, b) => a - b),
  }))
  .map(item => ({
    ...item,
    value: (`${item.name} | ${item.hours.join(' ')}`).trim(),
  }))

const calculateHours = list => parent => {
  const children = list.filter(item => item.parent === parent);
  console.log(children);
  if (children.length === 0) return list.find(({ index }) => index === parent).hours;

  return children.reduce(($, item) => {
    if (list.some(({ parent }) => parent === item.index)) {
      return product($)(calculateHours(list)(item.index));
    } else {
      return product($)(item.hours);
    }
  }, [0]);
}

export const hoistReducedHours = list => n => list
  .map(item => ({
    ...item,
    hours: calculateReducedHours(list)(item.index)(n).sort((a, b) => a - b),
  }))
  .map(item => ({
    ...item,
    value: (`${item.name} | ${item.hours.join(' ')}`).trim(),
  }))

const calculateReducedHours = list => parent => n => {
  const children = list.filter(item => item.parent === parent)
  console.log(children)
  if (children.length === 0) return list.find(({ index }) => index === parent).hours

  return children.reduce(($, item) => {
    if (list.some(({ parent }) => parent === item.index)) {
      return product(reduceByEdges(sort($))(n))(calculateHours(list)(item.index))
    } else {
      return product(reduceByEdges(sort($))(n))(item.hours)
    }
  }, [0])
}

export const listToTree = list => text => textToArr(text).map(item => {
  const newItem = list.find(({ index }) => index === item.index)
  return Array(item.indentation + 1).join(' ') + (newItem || item).value
}).join('\n')


export const handleFlat = (text, n = Infinity) => {
  const tasks = treeToList(text)
  console.table(tasks)

  const a=tasks

  const b= splitTaskParams(a).filter(({ value }) => value[0] !== '#')

  console.table(b.map(item => ({ ...item, hours: JSON.stringify(item.hours) })));
console.log(hoistHours)
//   const c=hoistHours(b)
//   console.table(c.map(item => ({ ...item, hours: JSON.stringify(item.hours) })));

	const d = hoistReducedHours(b)(n)

//   console.log(listToTree(c)(text))
  return {
		// text: listToTree(c)(text),
		text: listToTree(d)(text), // !!
		// graphData: toProbGraph(sort(productEach(c.filter(({ parent }) => parent === null).map(({ hours }) => hours)))),
		reducedGraphData: toProbGraph(sort(  productEach(d.filter(({ parent }) => parent === null).map(({ hours }) => hours))  )),
	};

}
