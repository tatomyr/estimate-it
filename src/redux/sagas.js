import { delay } from 'redux-saga'
import { put, call, select, takeEvery, all } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'
import * as api from '../helpers/api'
import { TOGGLE_SPINNER, REDIRECT, CHANGE_TEXT } from '../actions/types'

export function* saveEstimate(action) {
  try {
    const { estimate: { text }, params: { apiKey, estimateId } } = yield select(state => state)
    yield put({ type: TOGGLE_SPINNER, payload: { showSpinner: true } })
    const { _id } = yield call(api.saveEstimate, { text, apiKey, estimateId })
    yield put({ type: REDIRECT, payload: { pathToRedirect: `/${apiKey}/${_id}` } })
    toastr.success('New project has been created', `Id: ${_id}`)
  } catch (err) {
    toastr.error('Error', `${err.message}\nCheck your access rights or your network connection, or try again in few minutes.`)
  } finally {
    yield put({ type: TOGGLE_SPINNER, payload: { showSpinner: false } })
  }
}

export function* watchSaveEstimate() {
  yield takeEvery('SAVE_ESTIMATE', saveEstimate)
}


export function* getEstimate(action) {
  const { params: { apiKey, estimateId } } = yield select(state => state)
  if (estimateId) {
    try {
      yield put({ type: TOGGLE_SPINNER, payload: { showSpinner: true } })

      const { text } = yield call(api.getEstimate, { apiKey, estimateId })

      yield put({ type: CHANGE_TEXT, text })
    } catch (err) {
      toastr.error('Error', `${err.message}\nWe can't find such an estimate :(`)
    } finally {
      yield put({ type: TOGGLE_SPINNER, payload: { showSpinner: false } })
    }
  }
}

export function* watchGetEstimate() {
  yield takeEvery('GET_ESTIMATE', getEstimate)
}

export default function* rootSaga() {
  yield all([
    watchSaveEstimate(),
    watchGetEstimate(),
  ])
}
