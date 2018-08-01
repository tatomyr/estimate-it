import {
  ADD_SPINNER,
  DEL_SPINNER,
  OPEN_AUTH_SCREEN,
  CLOSE_AUTH_SCREEN,
  ENLARGE_GRAPH,
  MINIFY_GRAPH,
} from '../actions/types'

export default (state = {
  spinnersCount: false,
  showAuthScreen: false,
  graphView: 'minified',
}, { type }) => {
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

    case ENLARGE_GRAPH:
      return ({
        ...state,
        graphView: 'full',
      })

    case MINIFY_GRAPH:
      return ({
        ...state,
        graphView: 'minified',
      })

    default:
      return state
  }
}
