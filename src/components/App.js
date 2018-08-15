import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './ProtectedRoute'
import Home from './Home'
import Private from './Private'
import Redirector from './Redirector'
import Estimate from './Estimate'
import Dashboard from './Dashboard'
import AuthScreen from './AuthScreen'
import Spinner from './Spinner'
import Toastr from './Toastr'

const App = () => (
  <div>
    <Redirector />
    <Switch>
      <Route exact path="/" component={Home} />
      <Private>
        <Switch>
          <Route path="/estimate/new" component={Estimate} />
          <Route isProtected path="/estimate/:estimateId" component={Estimate} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/auth" component={AuthScreen} />
        </Switch>
      </Private>
    </Switch>
    <Spinner />
    <Toastr />
  </div>
)

export default App
