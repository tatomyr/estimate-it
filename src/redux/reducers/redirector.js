import { REDIRECT } from '../actions/types'

const defaultState = {
  pathToRedirect: '',
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case REDIRECT:
      return ({
        pathToRedirect: payload.pathToRedirect,
      })

    default:
      return state
  }
}
