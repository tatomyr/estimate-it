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
  SET_CREDS_CHECKING,
} from './types'
import * as api from '../../helpers/api'

export const updateEstimate = estimate => ({
  type: UPDATE_ESTIMATE,
  payload: estimate,
})

export const cleanEstimate = ({ estimateId }) => ({
  type: CLEAN_ESTIMATE,
  payload: estimateId,
})

export const cleanAllEstimates = () => ({
  type: CLEAN_ALL_ESTIMATES,
})

export const recalc = _id => ({
  type: RECALCULATE,
  payload: _id,
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

export const setCredsChecking = () => ({
  type: SET_CREDS_CHECKING,
})

export const setCreds = () => ({
  type: SET_CREDS,
  payload: { ...api.getCreds() },
})

export const resetCreds = () => ({
  type: RESET_CREDS,
})

export const setTitles = payload => ({
  type: SET_TITLES,
  payload,
})

export const markEstimateSaved = payload => ({
  type: MARK_ESTIMATE_SAVED,
  payload,
})

export const enlargeGraph = () => ({
  type: ENLARGE_GRAPH,
})

export const minifyGraph = () => ({
  type: MINIFY_GRAPH,
})
