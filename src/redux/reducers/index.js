import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import estimate from './estimate'
import visualEffects from './visualEffects'
import redirector from './redirector'

export default combineReducers({
  estimate,
  visualEffects,
  toastr: toastrReducer,
  redirector,
})
