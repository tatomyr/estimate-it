// FIXME: clean up here

import { toastr } from 'react-redux-toastr'
import * as api from '../../helpers/api'
import {
  addSpinner,
  delSpinner,
  redirect,
  addEstimate,
  cleanEstimate,
  closeAuthScreen,
  openAuthScreen,
  setCreds,
  resetCreds,
} from './index'

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  dispatch({ type: '__ASYNC__SAVE_ESTIMATE' })

  const estimateToSave = getState().estimates[estimateId]
  // TODO: check/validate estimate schema: text should not be empty ?
  dispatch(addSpinner())
  api.saveEstimate(estimateToSave)
    .then(estimate => {
      dispatch(addEstimate(estimate))
      dispatch(redirect(`/estimate/${estimate._id}`))
      toastr.success('Saved', `Id: ${estimate._id}`)
    })
    .catch(({ message }) => {
      toastr.error('Error', `${message}\nCheck your access rights`)
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const getEstimate = ({ estimateId }) => dispatch => {
  dispatch({ type: '__ASYNC__GET_ESTIMATE' })
  if (estimateId === 'new') return false

  dispatch(addSpinner())
  return api.getEstimate({ estimateId })
    .then(estimate => {
      // Catching specific case of `restdb.io` response
      if (estimate instanceof Array || estimate === null) {
        throw new Error("We can't find such an estimate :(")
      }
      dispatch(addEstimate(estimate))
    })
    .catch(err => {
      toastr.error('Error', `${err.message}`)
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const checkCreds = () => dispatch => {
  dispatch({ type: '__ASYNC__CHECK_CREDS' })

  dispatch(addSpinner())
  return api.checkCreds()
    .then(() => {
      dispatch(setCreds())
      dispatch(closeAuthScreen())
    })
    .catch(() => { dispatch(resetCreds()) })
    .finally(() => { dispatch(delSpinner()) })
}

export const openGuestSession = () => dispatch => {
  dispatch({ type: '__ASYNC__OPEN_GUEST_SESSION' })

  dispatch(redirect(''))
  setTimeout(() => dispatch(closeAuthScreen()))
  setTimeout(() => dispatch(redirect('/estimate/new')))
}
