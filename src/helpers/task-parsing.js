import {
  sort,
  product,
  productEach,
  reduceByEdges,
  toProbGraph,
} from 'augmented-multiset'

const getIndentation = str => {
  let previous = ''
  /* eslint-disable-next-line */
  for (const chr of str) {
    if (
      (chr === ' ' || chr === '\t')
      && (previous === '' || previous.includes(chr))
    ) {
      previous += chr
    } else break
  }
  return previous.length
}

const textToArr = text => text.split('\n')
  .map((line, i) => ({
    value: line.trim(),
    indentation: getIndentation(line),
    index: i,
  }));

const last = arr => arr[arr.length - 1];

const getParent = arr => indentation => sibling => {
  if (sibling === undefined) {
    if (arr.length === 0) return null
    else throw new Error('Invalid tree structure!');
  }

  if (indentation === sibling.indentation) {
    return sibling.parent;
  } else if (indentation > sibling.indentation && sibling === last(arr)) {
    return sibling.index;
  } else {
    return getParent(arr)(indentation)(arr.find(item => item.index === sibling.parent));
  }
}

export const treeToList = text => textToArr(text).filter(item => (
  item.value.trim()
  && item.value.trim()[0] !== '@'
  && item.value.trim()[0] !== '%'
)).reduce(($, item) => [
  ...$,
  { ...item, parent: getParent($)(item.indentation)(last($)) },
], [])

export const splitTaskParams = list => list.map(item => ({
  ...item,
  name: item.value.split(/[=|]/)[0].trim(),
  hours: (item.value.split(/[=|]/)[1] || '').trim().split(/\s+/).map(time => +time),
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

//   const c=hoistHours(b)
//   console.table(c.map(item => ({ ...item, hours: JSON.stringify(item.hours) })));

	const d =hoistReducedHours(b)(n)

//   console.log(listToTree(c)(text))
  return {
		// text: listToTree(c)(text),
		text: listToTree(d)(text), // !!
		// graphData: toProbGraph(sort(productEach(c.filter(({ parent }) => parent === null).map(({ hours }) => hours)))),
		reducedGraphData: toProbGraph(sort(  productEach(d.filter(({ parent }) => parent === null).map(({ hours }) => hours))  )),
	};

}
