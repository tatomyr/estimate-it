import { handleFlat } from '../lib/task-parsing';
import defaultText from '../lib/default-text';

export const appReducer = (state = {
  text: defaultText
}, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        ...state,
        text: (action.e.changes[0].text.includes('\n'))
          ? handleFlat(action.text)
          : action.text
      }
    default:
      return state;
  }
}
