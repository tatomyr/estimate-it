import { handleFlat } from '../../helpers/task-parsing'
import {
  ADD_ESTIMATE,
  RECALCULATE,
  CLEAN_ESTIMATE,
} from '../actions/types'

const emptyEstimate = { text: '', graphData: [] }

const defaultState = {
  new: emptyEstimate,
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_ESTIMATE:
      return ({
        ...state,
        [payload._id]: { ...payload },
      })
    case CLEAN_ESTIMATE:
      return ({
        ...state,
        [payload.estimateId]: emptyEstimate,
      })
    case RECALCULATE:
      return ({
        ...state,
        [payload._id]: {
          _id: payload._id,
          ...handleFlat(state[payload._id].text),
        },
      })

    default:
      return state
  }
}
