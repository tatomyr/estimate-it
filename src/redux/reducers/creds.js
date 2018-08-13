import { SET_CREDS, RESET_CREDS } from '../actions/types'

export const emptyCreds = ({
  haveBeenChecked: false,
  username: '',
  dbName: '',
  apiKey: '',
})

export default (state = emptyCreds, { type, payload }) => {
  switch (type) {
    case SET_CREDS:
      return ({
        ...payload,
        haveBeenChecked: true,
      })

    case RESET_CREDS:
      return ({
        ...emptyCreds,
        haveBeenChecked: true,
      })

    default:
      return state
  }
}
