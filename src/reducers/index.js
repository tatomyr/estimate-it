import { handleFlat } from '../helpers/task-parsing'
import defaultText from '../helpers/default-text'

const defaultState = {
  text: defaultText,
  graphData: [],
  reducedGraphData: [],
}

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      if (action.e.changes[0].text.includes('\n')) {
        const { text, graphData, reducedGraphData } = handleFlat(action.text, 15)
        return {
          ...state,
          text,
          graphData,
          reducedGraphData,
        }
      }
      return {
        ...state,
        text: action.text,
      }
    case 'EDITOR_BLUR':
      const { text, graphData, reducedGraphData } = handleFlat(state.text, 15)
      if (text === state.text) return state
      return {
        ...state,
        text,
        graphData,
        reducedGraphData,
      }
    default:
      return state
  }
}
