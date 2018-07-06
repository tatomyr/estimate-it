import {
  ADD_ESTIMATE,
  CLEAN_ESTIMATE,
  RECALCULATE,
  REDIRECT,
  ADD_SPINNER,
  DEL_SPINNER,
  SET_CREDS,
  RESET_CREDS,
  OPEN_AUTH_SCREEN,
  CLOSE_AUTH_SCREEN,
} from './types'
import * as api from '../../helpers/api'

export const addEstimate = estimate => ({
  type: ADD_ESTIMATE,
  payload: estimate,
})

export const cleanEstimate = estimateId => ({
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
  payload: { apiKey: api.getApiKey() },
})

export const resetCreds = () => ({
  type: RESET_CREDS,
})
