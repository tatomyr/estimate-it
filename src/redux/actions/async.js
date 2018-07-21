// FIXME: clean up here
// TODO: rewrite with async-await syntax

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
  setTitles,
} from './index'

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  dispatch({ type: '__ASYNC__SAVE_ESTIMATE' })

  if (!api.getCreds().username) {
    return toastr.warning('Warning', 'You must pass authentication to be able to save an estimate.')
  }

  dispatch(addSpinner())

  const estimateToSave = getState().estimates[estimateId]

  return api.getEstimate({ estimateId })
    .then(estimate => {
      // Check whether the estimate has been modified by someone else
      if (
        estimate._changed !== estimateToSave._changed
        // eslint-disable-next-line no-alert
        && !window.confirm(`You're trying to rewrite changes made by ${estimate.modifiedBy}. Rewrite?`)
      ) {
        return false
      }

      if (!estimateToSave.calculated) {
        toastr.warning('Warning', 'Consider calculating estimate before saving.')
      }
      dispatch(addSpinner())
      return api.saveEstimate(estimateToSave)
        .then(savedEstimate => {
          const { _id, project } = savedEstimate
          dispatch(updateEstimate(savedEstimate))
          dispatch(redirect(`/estimate/${_id}`))
          toastr.success('Saved', project
            ? `Current project: ${project}`
            : `Id: ${_id}`)
        })
        .catch(({ message }) => {
          toastr.error('Error', `${message}\nCheck your access rights`)
        })
        .finally(() => { dispatch(delSpinner()) })
    })
    .catch(({ message }) => {
      toastr.error('Error', `${message}`)
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
    .catch(({ message }) => {
      toastr.error('Error', `${message}`)
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

export const fetchTitles = () => dispatch => {
  dispatch({ type: '__ASYNC__FETCH_TITLES' })

  dispatch(addSpinner())
  return api.fetchTitles()
    .then(titles => {
      console.log(titles)

      // Catching specific case of `restdb.io` response
      // if (estimate instanceof Array || estimate === null) {
      //   throw new Error("We can't find such a project :(")
      // }
      dispatch(setTitles(titles))


    })
    .catch(({ message }) => {
      toastr.error('Error', `${message}`)
    })
    .finally(() => { dispatch(delSpinner()) })
}
