// TODO: put into separate module
// TODO: consider import diff function from discrete-uniform-distribution

const shallowDiff = base => alter => {
  const diffArr = Object.entries(base).filter(([key, value]) => value !== alter[key])
  return diffArr.reduce(($, [key, value]) => ({ ...$, [key]: value }), ({}))
}

// FIXME: test
const prev = { same: 1, deleted: 2, updated: 3 }
const next = { same: 1, updated: 4, added: 5 }
const added = shallowDiff(next)(prev)
const deleted = shallowDiff(prev)(next)
console.info('+', added)
console.info('-', deleted)

console.log(shallowDiff(prev)(deleted))

export default shallowDiff
