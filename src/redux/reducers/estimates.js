import { handleText, parseParam } from '../../helpers/tasks-parsing'
import {
  UPDATE_ESTIMATE,
  RECALCULATE,
  CLEAN_ESTIMATE,
  CLEAN_ALL_ESTIMATES,
  SET_TITLES,
  MARK_ESTIMATE_SAVED,
} from '../actions/types'

export const emptyEstimate = ({
  _id: 'new',
  text: '',
  graphData: [],
  project: '',
  participants: [],
  calculated: true,
  saved: true,
})

const getProjectName = text => parseParam(text)('@project')
const getParticipants = text => parseParam(text)('@participants')
  .split(',')
  .map(participant => participant.trim())
  .filter(participant => participant)

export default (state = ({ new: emptyEstimate }), { type, payload }) => {
  switch (type) {
    case UPDATE_ESTIMATE:
    {
      const { _id, text } = payload
      return ({
        ...state,
        [_id]: {
          ...state[_id],
          graphData: [],
          calculated: false,
          saved: false,
          project: getProjectName(text),
          participants: getParticipants(text),
          ...payload,
        },
      })
    }

    case CLEAN_ESTIMATE:
    {
      // Putting 'new' here to avoid creating an estimate with an undefined `_id`
      // ...while logging out on different routes
      // ...(that may not contain an `:estimateId` param)
      const { _id = 'new' } = payload
      return ({
        ...state,
        [_id]: {
          ...emptyEstimate,
          _id,
        },
      })
    }

    case CLEAN_ALL_ESTIMATES:
      return ({
        new: emptyEstimate,
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
        },
      })
    }

    case SET_TITLES:
    {
      const { projects } = payload
      return ({
        ...state,
        ...projects.reduce(($, project) => ({
          ...$,
          [project._id]: {
            ...project,
            saved: true,
          },
        }), {}),
      })
    }

    case MARK_ESTIMATE_SAVED:
    {
      const { _id } = payload
      return ({
        ...state,
        [_id]: {
          ...state[_id],
          saved: true,
        },
      })
    }

    default:
      return state
  }
}
