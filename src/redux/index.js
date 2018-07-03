import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
  /* eslint-disable-next-line */
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

sagaMiddleware.run(rootSaga)
export const action = type => store.dispatch({ type })

export default store
