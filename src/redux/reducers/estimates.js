import { handleText, parseParam } from '../../helpers/task-parsing'
import {
  UPDATE_ESTIMATE,
  RECALCULATE,
  CLEAN_ESTIMATE,
} from '../actions/types'

const emptyEstimate = ({
  _id: 'new',
  text: '',
  graphData: [],
  project: 'New Project',
  calculated: true,
})

const getProjectName = text => parseParam(text)('@project') || 'New Project'

export default (state = ({ new: emptyEstimate }), { type, payload }) => {
  switch (type) {
    case UPDATE_ESTIMATE:
    {
      const { _id } = payload
      return ({
        ...state,
        [_id]: {
          graphData: [],
          calculated: false,
          project: getProjectName(payload.text),
          ...payload,
        },
      })
    }
    case CLEAN_ESTIMATE:
      return ({
        ...state,
        // Put 'new' here to avoid creating an estimate with an undefined `_id`
        // ...while logging out on different routes
        // ...(that may not contain an `:estimateId` param)
        [payload.estimateId || 'new']: emptyEstimate,
      })
    case RECALCULATE:
    {
      const { _id } = payload
      return ({
        ...state,
        [_id]: {
          _id,
          ...handleText(state[_id].text),
          calculated: true,
          project: getProjectName(state[_id].text),
        },
      })
    }

    default:
      return state
  }
}
