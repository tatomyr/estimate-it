// TODO: Implement login route: .../login/:dbName/:apiKey
import { SET_CREDS, RESET_CREDS } from '../actions/types'

const emptyCreds = ({
  dbName: '',
  apiKey: '',
  username: '',
})

export default (state = emptyCreds, { type, payload }) => {
  switch (type) {
    case SET_CREDS:
      return ({
        ...payload,
      })
    case RESET_CREDS:
      return emptyCreds

    default:
      return state
  }
}
