import { SET_LOCATION, RESET_LOCATION } from '../actions/types'

export default (state = ({
  location: '',
}), { type, payload }) => {
  switch (type) {
    case SET_LOCATION:
      return ({
        location: payload,
      })

    case RESET_LOCATION:
      return ({
        location: '',
      })

    default:
      return state
  }
}
