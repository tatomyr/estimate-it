import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

/* eslint-disable */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
)

const store = createStore(rootReducer, enhancer)

export default store
