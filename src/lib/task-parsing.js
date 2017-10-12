import { sort, product, toProbGraph } from 'augmented-multiset';

const getIndentation = str => {
	let previous = '';
	for (const chr of str) {
		if (
			(chr === ' ' || chr === '\t') &&
			(previous === '' || previous.includes(chr))
		) {
			previous += chr;
		} else break;
	}
	return previous.length;
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
	item.value.trim() &&
	item.value.trim()[0] !== '@' &&
	item.value.trim()[0] !== '%'
)).reduce(($, item) => [
	...$,
	{ ...item, parent: getParent($)(item.indentation)(last($)) }
], []);

export const splitTaskParams = list => list.map(item => ({
	...item,
	name: item.value.split(/[=\|]/)[0].trim(),
	hours: (item.value.split(/[=\|]/)[1] || '').trim().split(/\s+/).map(time => +time)
}));


export const hoistHours = list => list
	.map(item => ({
		...item,
		hours: calculateHours(list)(item.index).sort((a, b) => a - b),
	}))
	.map(item => ({
		...item,
		value: item.name + ' | ' + item.hours.join(' '),
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

export const listToTree = list => text => textToArr(text).map(item => {
	const newItem = list.find(({ index }) => index === item.index);
	// console.log(newItem);

	// return {
	// 	...item,
	// 	...newItem,
	// 	// value: Array(item.indentation + 1).join(' ') + item.value,
	// };

	return Array(item.indentation + 1).join(' ') + (newItem || item).value;
}).join('\n')
