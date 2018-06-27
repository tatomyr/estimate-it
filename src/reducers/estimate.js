import { handleFlat } from '../helpers/task-parsing'
import defaultText from '../helpers/default-text'
import { CHANGE_TEXT, RECALCULATE } from '../actions/types'

const defaultState = {
  text: defaultText,
  reducedGraphData: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      }
    case RECALCULATE:
    {
      const { text, reducedGraphData } = handleFlat(state.text, 3)
      if (text === state.text) return state
      return {
        ...state,
        text,
        reducedGraphData,
      }
    }
    default:
      return state
  }
}
