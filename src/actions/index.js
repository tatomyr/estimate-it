import { toastr } from 'react-redux-toastr'
import { CHANGE_TEXT, RECALCULATE, SET_PARAMS, REDIRECT, TOGGLE_SPINNER } from './types'
import * as api from '../helpers/api'

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

export const redirect = pathToRedirect => ({
  type: REDIRECT,
  payload: { pathToRedirect },
})

const toggleSpinner = showSpinner => ({
  type: TOGGLE_SPINNER,
  payload: { showSpinner },
})

export const saveEstimate = () => (dispatch, getState) => {
  const { estimate: { text }, params: { apiKey, estimateId } } = getState()
  dispatch(toggleSpinner(true))
  api.saveEstimate({ text, apiKey, estimateId })
    .then(({ _id }) => {
      dispatch(redirect(`/${apiKey}/${_id}`))
      toastr.success('Saved', `Id: ${_id}`)
    })
    .catch(({ message }) => {
      toastr.error('Error', `${message}\nCheck your access rights or your network connection, or try again in few minutes.`)
    })
    .finally(() => { dispatch(toggleSpinner(false)) })
}

export const getEstimate = () => (dispatch, getState) => {
  const { params: { apiKey, estimateId } } = getState()
  if (estimateId) {
    dispatch(toggleSpinner(true))
    api.getEstimate({ apiKey, estimateId })
      .then(({ text }) => {
        dispatch(changeText(text))
      })
      .catch(({ message }) => {
        toastr.error('Error', `${message}\nWe can't find such an estimate :(`)
      })
      .finally(() => { dispatch(toggleSpinner(false)) })
  }
}
