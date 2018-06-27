import { combineReducers } from 'redux'
import { handleFlat } from '../helpers/task-parsing'
import defaultText from '../helpers/default-text'
import { CHANGE_TEXT, EDITOR_BLUR } from '../actions/types'

const defaultState = {
  text: defaultText,
  reducedGraphData: [],
}

const appData = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      }
    case EDITOR_BLUR:
    {
      const { text, reducedGraphData } = handleFlat(state.text, 15)
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

export default combineReducers({
  appData,
})
