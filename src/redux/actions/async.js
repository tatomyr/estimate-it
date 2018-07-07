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
  if (estimateId === 'new') return false

  dispatch(addSpinner())
  return api.getEstimate({ estimateId })
    .then(estimate => {
      if (estimate instanceof Array || estimate === null) {
        throw new Error("We can't find such an estimate :(")
      }
      dispatch(addEstimate(estimate))
      dispatch(closeAuthScreen())
    })
    .catch(err => {
      console.log('[ERR]', {err})
      // FIXME: do we need this?
      dispatch(cleanEstimate(estimateId))
      if (err.message === 'Failed to fetch') {
        // Auth issues
        dispatch(openAuthScreen())
      } else {
        toastr.error('Error', `${err.message}`)
      }
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const checkCreds = () => dispatch => {
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
  dispatch(redirect('/estimate/new'))
  setTimeout(() => dispatch(closeAuthScreen()))
}
