import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App'
import NotPermitted from './components/NotPermitted'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:apiKey/:estimateId?" component={App} />
        <Route path="/" component={NotPermitted} />
      </Switch>
    </Router>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
