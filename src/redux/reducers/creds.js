// TODO: Implement login route: .../login/:dbName/:apiKey
import { SET_CREDS_CHECKING, SET_CREDS, RESET_CREDS } from '../actions/types'

export const emptyCreds = ({
  dbName: '',
  apiKey: '',
  username: '',
  checkingCreds: false,
})

export default (state = emptyCreds, { type, payload }) => {
  switch (type) {
    case SET_CREDS_CHECKING:
      return ({
        ...state,
        checkingCreds: true,
      })

    case SET_CREDS:
      return ({
        ...payload,
        checkingCreds: false,
      })

    case RESET_CREDS:
      return emptyCreds

    default:
      return state
  }
}
