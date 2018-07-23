import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Toastr from '../Toastr'
import Redirector from '../Redirector'
import Spinner from '../Spinner'
import Private from '../Private'
import Estimate from '../Estimate'
import Dashboard from '../Dashboard'
import AuthScreen from '../AuthScreen'

class App extends React.Component {
  componentDidMount = () => {
    const { checkCreds, username } = this.props
    if (!username) checkCreds()
  }

  render = () => (
    <div>
      <Redirector />
      <Private>
        <Switch>
          <Route path="/estimate/:estimateId" component={Estimate} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Private>
      {/* eslint-disable-next-line */}
      {this.props.showAuthScreen && <AuthScreen />}
      <Spinner />
      <Toastr />
    </div>
  )
}

App.propTypes = {
  checkCreds: PropTypes.func.isRequired,
  showAuthScreen: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}

export default App
