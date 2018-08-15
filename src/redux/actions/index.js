import {
  UPDATE_ESTIMATE,
  CLEAN_ESTIMATE,
  CLEAN_ALL_ESTIMATES,
  RECALCULATE,
  SET_LOCATION,
  RESET_LOCATION,
  ADD_SPINNER,
  DEL_SPINNER,
  SET_CREDS,
  RESET_CREDS,
  SET_TITLES,
  MARK_ESTIMATE_SAVED,
  ENLARGE_GRAPH,
  MINIFY_GRAPH,
} from './types'
import * as api from '../../helpers/api'

export const updateEstimate = estimate => ({
  type: UPDATE_ESTIMATE,
  payload: estimate,
})

export const cleanEstimate = _id => ({
  type: CLEAN_ESTIMATE,
  payload: { _id },
})

export const cleanAllEstimates = () => ({
  type: CLEAN_ALL_ESTIMATES,
})

export const recalc = _id => ({
  type: RECALCULATE,
  payload: { _id },
})

export const setLocation = location => ({
  type: SET_LOCATION,
  payload: location,
})

export const resetLocation = () => ({
  type: RESET_LOCATION,
})

export const addSpinner = () => ({
  type: ADD_SPINNER,
})

export const delSpinner = () => ({
  type: DEL_SPINNER,
})

export const setCreds = () => ({
  type: SET_CREDS,
  payload: { ...api.getCreds() },
})

export const resetCreds = () => ({
  type: RESET_CREDS,
})

export const setTitles = projects => ({
  type: SET_TITLES,
  payload: { projects },
})

export const markEstimateSaved = _id => ({
  type: MARK_ESTIMATE_SAVED,
  payload: { _id },
})

export const enlargeGraph = () => ({
  type: ENLARGE_GRAPH,
})

export const minifyGraph = () => ({
  type: MINIFY_GRAPH,
})
