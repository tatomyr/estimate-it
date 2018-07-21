// TODO: delete or improve

// FIXME: del
// const extract = (...params) => obj => params.reduce(($, param) => ({
//   ...$,
//   [param]: obj[param],
// }), ({}))

const extract = schema => obj => {
  const include = Object.values(schema).every(flag => !!flag)
  const exclude = Object.values(schema).every(flag => !flag)
  if (include && exclude) throw new Error('All values must be either truthy or falsy to include or exclude appropriate fields respectively.')

  return Object.entries(obj)
    .filter(([field]) => (include && schema[field]) || (exclude && schema[field] !== undefined))
    .reduce(($, [field, value]) => ({ ...$, [field]: value }), {})
}

export default extract
