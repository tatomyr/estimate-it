// FIXME: {apiKey: {apiKey}} -> {creds: {apiKey, dbName}}

import { SET_CREDS, RESET_CREDS } from '../actions/types'

const defaultState = {
  apiKey: '',
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_CREDS:
      return ({
        apiKey: payload.apiKey,
      })
    case RESET_CREDS:
      return ({
        apiKey: '',
      })

    default:
      return state
  }
}
