import { handleFlat } from '../lib/task-parsing';
import defaultText from '../lib/default-text';

const defaultState = {
  text: defaultText,
  graphData: [],
  reducedGraphData: [],
};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      // const { text, graphData, reducedGraphData } = (action.e.changes[0].text.includes('\n'))
      //   ? handleFlat(action.text, 10)
      //   : {
      //     text: action.text,
      //     graphData: state.graphData,
      //     reducedGraphData: state.reducedGraphData,
      //   };

      if (action.e.changes[0].text.includes('\n')) {
        const { text, graphData, reducedGraphData } = handleFlat(action.text, 15);
        return { ...state, text, graphData, reducedGraphData }
      }

      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
}
