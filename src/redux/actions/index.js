import {
  UPDATE_ESTIMATE,
  CLEAN_ESTIMATE,
  RECALCULATE,
  REDIRECT,
  ADD_SPINNER,
  DEL_SPINNER,
  SET_CREDS,
  RESET_CREDS,
  OPEN_AUTH_SCREEN,
  CLOSE_AUTH_SCREEN,
  SET_TITLES,
  MARK_ESTIMATE_SAVED,
} from './types'
import * as api from '../../helpers/api'

export const updateEstimate = estimate => ({
  type: UPDATE_ESTIMATE,
  payload: estimate,
})

export const cleanEstimate = ({ estimateId }) => ({
  type: CLEAN_ESTIMATE,
  payload: { estimateId },
})

export const recalc = _id => ({
  type: RECALCULATE,
  payload: { _id },
})

export const redirect = pathToRedirect => ({
  type: REDIRECT,
  payload: { pathToRedirect },
})

export const addSpinner = () => ({
  type: ADD_SPINNER,
})

export const delSpinner = () => ({
  type: DEL_SPINNER,
})

export const openAuthScreen = () => ({
  type: OPEN_AUTH_SCREEN,
})

export const closeAuthScreen = () => ({
  type: CLOSE_AUTH_SCREEN,
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
