// TODO: put into separate module

// Define Zero
export const O = []

// Define One
export const I = [0]

// baseSum :: ([Number], [Number]) -> [Number]
export const baseSum = (u, v) => [...u, ...v]

// baseProduct :: [Number] -> [Number] -> [Number]
export const baseProduct = (u, v) => u.reduce(($, x) => baseSum($, v.map(y => x + y)), O)

// sort :: [Number] -> [Number]
export const sort = ([...u]) => u.sort((a, b) => a - b)

// round :: ([Number], Int) -> [Number]
export const round = (u, rounding = Infinity) => {
  const v = sort(u)

  if (rounding < 2) throw new Error('Rounding the muliset to less than 2 elements.')

  if (rounding >= v.length) return v

  return Array(rounding).fill().map((_, j) => {
    const K = (v.length - 1) * j / (rounding - 1)
    return (v[Math.floor(K)] + v[Math.ceil(K)]) / 2
  })
}

// reduce :: [Number] -> [Number]
// TODO: implement reduce…

// sum :: ([Number], [Number], Int) -> [Number]
export const sum = (u, v, rounding) => round(baseSum(u, v), rounding)

// product :: ([Number], [Number], Int) -> [Number]
export const product = (u, v, rounding) => round(baseProduct(u, v), rounding)

// TODO: try to implement substraction, division

// TODO: toProbGraph :: …
// export const toProbGraph = u => u.map((val, i) => [val, i / u.length])
export const toProbGraph = u => {
  if (u.length === 1) return [[u[0], 0], [u[0], 1]]
  return u.map((val, i) => [val, i / (u.length - 1)])
}
