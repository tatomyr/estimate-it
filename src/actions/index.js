import { CHANGE_TEXT, RECALCULATE, SET_PARAMS } from './types'

export const changeText = text => ({
  type: CHANGE_TEXT,
  text,
})

export const recalc = () => ({
  type: RECALCULATE,
})

export const setParams = ({ apiKey, estimateId }) => ({
  type: SET_PARAMS,
  payload: {
    apiKey,
    estimateId,
  },
})

