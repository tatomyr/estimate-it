import { toastr } from 'react-redux-toastr'
import * as api from '../../helpers/api'
import {
  addSpinner,
  delSpinner,
  redirect,
  addEstimate,
  closeAuthScreen,
  openAuthScreen,
  setCreds,
  resetCreds,
} from './index'

export const saveEstimate = ({ estimateId }) => (dispatch, getState) => {
  // const { estimates: { text } } = getState()
  const estimateToSave = getState().estimates[estimateId]
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
  api.getEstimate({ estimateId })
    .then(estimate => {
      dispatch(addEstimate(estimate))
      dispatch(closeAuthScreen())
    })
    .catch(({ message }) => {
      dispatch(addEstimate({ text: '', _id: estimateId }))
      toastr.error('Error', `${message}\nWe can't find such an estimate :(`)
    })
    .finally(() => { dispatch(delSpinner()) })
}

export const checkCreds = () => dispatch => {
  dispatch(addSpinner())
  api.checkCreds()
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
