// TODO: Implement login route: .../login/:dbName/:apiKey

import { SET_CREDS, RESET_CREDS } from '../actions/types'

const defaultState = {
  dbName: '',
  apiKey: '',
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_CREDS:
      return ({
        ...payload,
      })
    case RESET_CREDS:
      return ({
        dbName: '',
        apiKey: '',
      })

    default:
      return state
  }
}
