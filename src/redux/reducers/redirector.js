import { SET_HREF, RESET_HREF } from '../actions/types'

export default (state = ({
  href: '',
}), { type, payload }) => {
  switch (type) {
    case SET_HREF:
      return ({
        href: payload,
      })

    case RESET_HREF:
      return ({
        href: '',
      })

    default:
      return state
  }
}
