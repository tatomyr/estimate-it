import { SET_PARAMS } from '../actions/types'

const defaultState = {
  apiKey: '',
  estimateId: '',
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_PARAMS:
      return ({
        ...state,
        apiKey: payload.apiKey,
        estimateId: payload.estimateId,
      })

    default:
      return state
  }
}
