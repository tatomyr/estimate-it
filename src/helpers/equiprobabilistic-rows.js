// TODO: put into separate module

// Define Zero
export const O = []

// Define One
export const I = [0]

// baseSum :: ([Number], [Number]) -> [Number]
const baseSum = (u, v) => [...u, ...v]

// baseConvolution :: [Number] -> [Number] -> [Number]
const baseConvolution = (u, v) => u.reduce(($, x) => baseSum($, v.map(y => x + y)), O)

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
// TODO: implement reduce… Or maybe ¿RESIZE?

// sum :: ([Number], [Number], Int) -> [Number]
export const sum = (u, v, rounding) => round(baseSum(u, v), rounding)

// convolution :: ([Number], [Number], Int) -> [Number]
export const convolution = (u, v, rounding) => round(baseConvolution(u, v), rounding)

// TODO: if possible, try to implement substraction, division

// Cumulative probability at i-th point of m
// F :: Int -> Int -> Number
const F = i => m => (m === 1 ? 1 : i / (m - 1))

// convertToXY :: (Number, Int, [Number]) -> (Number, Number)
const convertToXY = (x, i, arr) => [x, F(i)(arr.length)]
// Another possible option could be:
// const convertToXY = (x, i, arr) => { x, y: F(i)(arr.length) }

// toProbGraph :: [Number] -> [[Number, Number]]
export const toProbGraph = u => u.map(convertToXY)
