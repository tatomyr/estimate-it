import { handleText } from '../../helpers/task-parsing'
import {
  ADD_ESTIMATE,
  RECALCULATE,
  CLEAN_ESTIMATE,
} from '../actions/types'

const emptyEstimate = ({
  _id: 'new',
  text: '',
  graphData: [],
  project: 'New Project',
})

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
        // Put 'new' here to avoid creating an estimate with an undefined `_id`
        // ...while logging out on different routes
        // ...(that may not contain an `:estimateId` param)
        [payload.estimateId || 'new']: emptyEstimate,
      })
    case RECALCULATE:
      return ({
        ...state,
        [payload._id]: {
          _id: payload._id,
          ...handleText(state[payload._id].text),
        },
      })

    default:
      return state
  }
}
