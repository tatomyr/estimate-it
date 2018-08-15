import {
  ADD_SPINNER,
  DEL_SPINNER,
  ENLARGE_GRAPH,
  MINIFY_GRAPH,
} from '../actions/types'

export default (state = {
  spinnersCount: false,
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
