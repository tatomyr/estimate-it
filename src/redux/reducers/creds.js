// TODO: Implement login route: .../login/:dbName/:apiKey
// TODO: Implement username
import { SET_CREDS, RESET_CREDS } from '../actions/types'

export default (state = ({
  dbName: '',
  apiKey: '',
  username: '',
}), { type, payload }) => {
  switch (type) {
    case SET_CREDS:
      return ({
        ...payload,
      })
    case RESET_CREDS:
      return ({
        dbName: '',
        apiKey: '',
        username: '',
      })

    default:
      return state
  }
}
