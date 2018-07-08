import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Redirector from '../Redirector'
import Sidebar from '../Sidebar'
import Spinner from '../Spinner'
import Private from '../Private'
import Estimate from '../Estimate'
import Dashboard from '../Dashboard'
import AuthScreen from '../AuthScreen'

class App extends React.Component {
  componentDidMount = () => {
    const { checkCreds } = this.props
    checkCreds()
  }

  render = () => (
    <div className="App">
      <Redirector />
      <Private>
        <Sidebar />
        <div className="board">
          <Switch>
            <Route path="/estimate/:estimateId" component={Estimate} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Private>
      {/* eslint-disable-next-line */}
      {this.props.showAuthScreen && <AuthScreen />}
      <Spinner />
      <ReduxToastr
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  )
}

App.propTypes = {
  checkCreds: PropTypes.func.isRequired,
}

export default App
