import { toastr } from 'react-redux-toastr'
import {
  CHANGE_TEXT,
  RECALCULATE,
  REDIRECT,
  TOGGLE_SPINNER,
} from './types'
import * as api from '../../helpers/api'

export const changeText = text => ({
  type: CHANGE_TEXT,
  text,
})

export const recalc = () => ({
  type: RECALCULATE,
})

export const redirect = pathToRedirect => ({
  type: REDIRECT,
  payload: { pathToRedirect },
})

const toggleSpinner = showSpinner => ({
  type: TOGGLE_SPINNER,
  payload: { showSpinner },
})

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  const { estimate: { text } } = getState()
  dispatch(toggleSpinner(true))
  api.saveEstimate({ text, estimateId })
    .then(({ _id }) => {
      dispatch(redirect(`/${_id}`))
      toastr.success('Saved', `Id: ${_id}`)
    })
    .catch(({ message }) => {
      toastr.error('Error', `${message}\nCheck your access rights or your network connection, or try again in few minutes.`)
    })
    .finally(() => { dispatch(toggleSpinner(false)) })
}

export const getEstimate = ({ estimateId }) => dispatch => {
  if (estimateId) {
    dispatch(toggleSpinner(true))
    api.getEstimate({ estimateId })
      .then(({ text }) => {
        dispatch(changeText(text))
      })
      .catch(({ message }) => {
        toastr.error('Error', `${message}\nWe can't find such an estimate :(`)
      })
      .finally(() => { dispatch(toggleSpinner(false)) })
  }
}
