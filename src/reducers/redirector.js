import { REDIRECT } from '../actions/types'

const defaultState = {
  pathToRedirect: null,
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case REDIRECT:
    console.log(state)
      return ({
        pathToRedirect: payload.pathToRedirect,
      })

    default:
      return state
  }
}
