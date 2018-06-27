/**
 * The Augumented Multiset lib provides methods to deal with special type of multiset.
 * A multiset itself is represented by ordinary JS array.
 */

const sum = u => v => [...u, ...v];
const sumEach = U => U.reduce(($, u) => sum($)(u));

const cartesianProduct = u => v => u.reduce(($, x) => sum($)(v.map(y => [x, y])), []);
const product = u => v => u.reduce(($, x) => sum($)(v.map(y => x + y)), []);
const productEach = U => U.reduce(($, u) => product($)(u), [0]);

const exclude = u => x => {
  const index = u.indexOf(x);
  return index === -1
    ? u
    : u.filter((_, i) => i !== index);
}
const diff = u => v => v.reduce(($, x) => exclude($)(x), u);
const equal = u => v => diff(u)(v).length === 0 && diff(v)(u).length === 0;

const sort = ([...u]) => u.sort((a, b) => a - b);

/**
 * Shrinking (resizing, rounding) an array of numbers to specified size
 *
 * reduceByEdges :: [Number] -> Number -> [Number]
 */
const reduceByEdges = u => (n = 2) => {
  if (n < 2) throw new Error('Rounding the muliset to less than 2 elements');

  if (n >= u.length) return u;

  return Array(n).fill().map((_, j) => {
    const m = u.length;
    const K = (m - 1) * j / (n - 1);
    // return u[Math.round(K)];
    return (u[Math.floor(K)] + u[Math.ceil(K)]) / 2;
  });
}

const reduceByAvg = u => (n = 1) => {
  if (n < 1) throw new Error('Rounding the muliset to less than 1 element');

  const m = u.length;
  const K = m / n;

  const outputMap = Array(n).fill().map((_, j) => ({
    edges: [Math.floor(K*j),Math.ceil(K*(j+1)-1)],
    halfIncluding: [
      Math.ceil(K*j-1)===Math.floor(K*j),
      Math.ceil(K*(j+1)-1)=== Math.floor(K*(j+1))
    ]
  }));

  console.log(outputMap)
  return outputMap.map((item, j) => {
    return u
      .filter((_, i) => i >= item.edges[0] && i <= item.edges[1])
      .reduce(($, value, _, arr) => console.log(':::',arr) || $ + +value / arr.length, 0)
  })
}

const _reduceByAvg_ = u => (n = 1) => {
  const m = u.length;
  const K = m / n;

  const outputMap = Array(n).fill().map((_, j) => ({
    edges: [Math.floor(K*j),Math.ceil(K*(j+1)-1)],
    halfIncluding: [
      Math.ceil(K*j-1)===Math.floor(K*j),
      Math.ceil(K*(j+1)-1)=== Math.floor(K*(j+1))
    ]
  }));

  console.log(outputMap)
  return outputMap.map((item, j) => {
    const samples = u
      .filter((_, i) => i >= item.edges[0] && i <= item.edges[1]);
    const n1 = item.halfIncluding[0] ? [samples[0] / 2, ...samples.slice(1)] : samples;
    const n2 = item.halfIncluding[1] ? [...n1.slice(0, n1.length - 1), n1[n1.length - 1] / 2] : n1;
    const d0 = item.edges[1] - item.edges[0] + 1;
    const d1 = d0 - (item.halfIncluding[0] ? 1/2 : 0);
    const d2 = d1 - (item.halfIncluding[1] ? 1/2 : 0);
    const numerator = n2.reduce(($, val) => $ + +val, 0);
    console.log(item.halfIncluding, '<>',samples,':',n2 ,'/', d2,'=',numerator/d2)
    return numerator / d2;
  })
}

const toProbGraph = u => u.map((val, i) => [val, i / (u.length - 1)])
const toTimeGraph = u => u.map((val, i) => [i / (u.length - 1), val])

/* */
module.exports = {
  sum,
  sumEach,
  product,
  productEach,
  diff,
  equal,
  sort,
  reduceByEdges,
  reduceByAvg,
  _reduceByAvg_,
  toProbGraph,
  toTimeGraph,
};
/* */

// console.log(
// '<===========>',
// sum([1,2])([3]),
// sumEach([[1,2],[3]]), sumEach([['a','b'],['c','d'],['e','f','g']]),
// product([1,2])([4,8, 16]),
// productEach([[1,2],[4,8, 16]]), productEach([[1,2],[4,8, 16],[100]]),
// )
