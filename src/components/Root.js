import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch } from 'react-router-dom'
import Route from './ProtectedRoute'
import App from './App'
import Home from './Home'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route isRequired path="/estimate/:estimateId" component={App} />
        <Route path="/dashboard" component={App} />
        <Route path="/auth" component={App} />
      </Switch>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Root
