// TODO: rewrite with async-await syntax

import { toastr } from 'react-redux-toastr'
import * as api from '../../helpers/api'
import {
  rewrite,
  signInToSave,
  uncalculated,
  cantSave,
  noEstimate,
  saved,
  defaultError,
  noName,
  noParticipants,
} from '../../helpers/messages'
import {
  addSpinner,
  delSpinner,
  setLocation,
  resetLocation,
  updateEstimate,
  setCreds,
  resetCreds,
  setTitles,
  markEstimateSaved,
} from './index'

export const redirect = location => dispatch => {
  dispatch({ type: '__ASYNC__REDIRECT' })
  dispatch(setLocation(location))
  setTimeout(() => dispatch(resetLocation()))
}

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  dispatch({ type: '__ASYNC__SAVE_ESTIMATE' })

  if (!getState().creds.username) {
    return toastr.warning(...signInToSave)
  }

  dispatch(addSpinner())
  const estimateToSave = getState().estimates[estimateId]
  return api.getEstimate({ estimateId })
    .then(estimate => {
      // Check whether the estimate exists
      if (!estimate._id && estimateId !== 'new') {
        throw new Error(noEstimate)
      }

      // Check whether the estimate has been modified by someone else
      if (
        estimate._changed !== estimateToSave._changed
        // eslint-disable-next-line no-alert
        && !window.confirm(rewrite(estimate))
      ) {
        return false
      }

      if (!estimateToSave.project) toastr.warning(...noName)

      if (!estimateToSave.participants.length) toastr.warning(...noParticipants)

      if (!estimateToSave.calculated) toastr.warning(...uncalculated)

      dispatch(addSpinner())
      return api.saveEstimate(estimateToSave)
        .then(savedEstimate => {
          dispatch(updateEstimate(savedEstimate))
          dispatch(markEstimateSaved(savedEstimate._id))
          dispatch(redirect(`/estimate/${savedEstimate._id}`))
          toastr.success(...saved(savedEstimate))
        })
        .catch(({ message }) => {
          toastr.error(...cantSave(message))
        })
        .finally(() => { dispatch(delSpinner()) })
    })
    .catch(err => {
      toastr.error(...defaultError(err))
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
        throw new Error(noEstimate)
      }
      dispatch(updateEstimate(estimate))
      dispatch(markEstimateSaved(estimateId))
    })
    .catch(err => {
      toastr.error(...defaultError(err))
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const checkCreds = () => dispatch => {
  dispatch({ type: '__ASYNC__CHECK_CREDS' })

  dispatch(addSpinner())
  return api.fetchTitles()
    .then(titles => {
      // eslint-disable-next-line no-console
      console.info(`${titles.length} record(s) found in the DB.`)
      dispatch(setTitles(titles))
      dispatch(setCreds())
    })
    .catch(() => { dispatch(resetCreds()) })
    .finally(() => { dispatch(delSpinner()) })
}
