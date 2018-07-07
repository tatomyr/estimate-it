import {
  ADD_SPINNER,
  DEL_SPINNER,
  OPEN_AUTH_SCREEN,
  CLOSE_AUTH_SCREEN,
} from '../actions/types'

const defaultState = {
  spinnersCount: false,
  showAuthScreen: false,
}

export default (state = defaultState, { type }) => {
  switch (type) {
    case ADD_SPINNER:
      return ({
        ...state,
        spinnersCount: state.spinnersCount + 1,
      })

    case DEL_SPINNER:
      return ({
        ...state,
        spinnersCount: state.spinnersCount - 1,
      })

    case OPEN_AUTH_SCREEN:
      return ({
        ...state,
        showAuthScreen: true,
      })

    case CLOSE_AUTH_SCREEN:
      return ({
        ...state,
        showAuthScreen: false,
      })

    default:
      return state
  }
}
