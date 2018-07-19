// FIXME: clean up here

import { toastr } from 'react-redux-toastr'
import * as api from '../../helpers/api'
import {
  addSpinner,
  delSpinner,
  redirect,
  updateEstimate,
  cleanEstimate,
  closeAuthScreen,
  openAuthScreen,
  setCreds,
  resetCreds,
} from './index'

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  dispatch({ type: '__ASYNC__SAVE_ESTIMATE' })
  if (!api.getCreds().username) {
    return toastr.warning('Warning', 'You must pass authentication to be able to save an estimate.')
  }

  // TODO: check if the estimate was updated after last load (and by who)
  //. And if possible show some diffs. Or calculate if the estimate can be merged without conflicts.
  // api.getEstimate({ estimateId })
  //   .then(estimate => {
  //     // Catching specific case of `restdb.io` response
  //     if (estimate instanceof Array || estimate === null) {
  //       // throw new Error("We can't find such an estimate :(")
  //     }
  //     // dispatch(updateEstimate(estimate))
  //   })
  //   .catch(err => {
  //     toastr.error('Error', `${err.message}`)
  //   })


  const estimateToSave = getState().estimates[estimateId]
  console.log('estimateToSave:', estimateToSave)
  if (!estimateToSave.calculated) {
    toastr.warning('Warning', 'Consider calculating estimate before saving.')
  }
  dispatch(addSpinner())
  return api.saveEstimate(estimateToSave)
    .then(estimate => {
      dispatch(updateEstimate(estimate))
      dispatch(redirect(`/estimate/${estimate._id}`))
      toastr.success('Saved', estimate.project
        ? `Current project: ${estimate.project}`
        : `Id: ${estimate._id}`)
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
        throw new Error("We can't find such a project :(")
      }
      dispatch(updateEstimate(estimate))
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
    .then(({ totals: { count } }) => {
      console.info(`${count} record(s) found in the DB.`)
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
