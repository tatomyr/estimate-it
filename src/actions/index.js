import { CHANGE_TEXT, RECALCULATE } from './types'

export const changeText = text => ({
  type: CHANGE_TEXT,
  text,
})

export const recalc = () => ({
  type: RECALCULATE,
})
