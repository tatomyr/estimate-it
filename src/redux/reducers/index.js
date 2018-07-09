import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import estimates from './estimates'
import visualEffects from './visualEffects'
import redirector from './redirector'
import creds from './creds'

export default combineReducers({
  estimates,
  visualEffects,
  toastr: toastrReducer,
  redirector,
  creds,
})
