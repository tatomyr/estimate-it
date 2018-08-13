import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import Toastr from '../Toastr'
import Redirector from '../Redirector'
import Spinner from '../Spinner'
import Estimate from '../Estimate'
import Dashboard from '../Dashboard'
import AuthScreen from '../AuthScreen'
import Route from '../ProtectedRoute'

// TODO: move to Root. Check creds in ProtectedRoute
class App extends React.Component {
  componentDidMount = () => {
    const { checkCreds, username } = this.props
    if (!username) checkCreds()
  }

  render = () => (
    <div>
      <Redirector />
      <Switch>
        <Route isProtected path="/estimate/:estimateId" component={Estimate} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auth" component={AuthScreen} />
      </Switch>
      <Spinner />
      <Toastr />
    </div>
  )
}

App.propTypes = {
  checkCreds: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default App
