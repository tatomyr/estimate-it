import { handleFlat } from '../helpers/task-parsing'
import defaultText from '../helpers/default-text'
import { CHANGE_TEXT, RECALCULATE } from '../actions/types'

const defaultState = {
  text: defaultText,
  graphData: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return ({
        ...state,
        text: action.text,
      })
    case RECALCULATE:
      return ({
        ...state,
        ...handleFlat(state.text),
      })
    default:
      return state
  }
}
