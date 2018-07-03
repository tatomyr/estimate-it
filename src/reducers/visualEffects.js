import { TOGGLE_SPINNER } from '../actions/types'

const defaultState = {
  showSpinner: false,
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SPINNER:
      return ({
        showSpinner: payload.showSpinner,
      })

    default:
      return state
  }
}
