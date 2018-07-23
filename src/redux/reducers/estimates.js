import { handleText, parseParam } from '../../helpers/task-parsing'
import {
  UPDATE_ESTIMATE,
  RECALCULATE,
  CLEAN_ESTIMATE,
  SET_TITLES,
  MARK_ESTIMATE_SAVED,
} from '../actions/types'

export const emptyEstimate = ({
  _id: 'new',
  text: '',
  graphData: [],
  project: 'New Project',
  calculated: true,
  saved: false,
})

const getProjectName = text => parseParam(text)('@project') || 'New Project'
// TODO: add saved status
export default (state = ({ new: emptyEstimate }), { type, payload }) => {
  switch (type) {
    case UPDATE_ESTIMATE:
    {
      const { _id } = payload
      return ({
        ...state,
        [_id]: {
          ...state[_id],
          graphData: [],
          calculated: false,
          saved: false,
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
          ...state[_id],
          _id,
          ...handleText(state[_id].text),
          calculated: true,
          saved: false,
          project: getProjectName(state[_id].text),
        },
      })
    }

    case SET_TITLES:
      return ({
        ...state,
        ...payload.reduce(($, project) => ({
          ...$,
          [project._id]: {
            ...project,
            saved: true,
          },
        }), {}),
      })

    case MARK_ESTIMATE_SAVED:
      return ({
        ...state,
        [payload]: {
          ...state[payload],
          saved: payload,
        },
      })

    default:
      return state
  }
}
