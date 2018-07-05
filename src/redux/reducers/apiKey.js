import { CHECK_CREDS } from '../actions/types'

const defaultState = {
  hasKey: false,
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case CHECK_CREDS:
      return ({
        hasKey: payload.hasKey,
      })

    default:
      return state
  }
}
