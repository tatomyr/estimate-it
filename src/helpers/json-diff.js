// TODO: put into separate module

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
// const addedOrDeleted = shallowDiff(added)(deleted)
// const deletedOrAdded = shallowDiff(deleted)(added)
// // if (JSON.stringify(addedOrDeleted) !== JSON.stringify(deletedOrAdded)) throw new Error('Should be the same!')
// const updated = shallowDiff(next)(addedOrDeleted)
// console.log((addedOrDeleted), (deletedOrAdded))
// console.log(updated, shallowDiff(prev)(addedOrDeleted))
// console.log(shallowDiff(['a', 'b'])(['a', 'c']))

export default shallowDiff
