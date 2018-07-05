import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Redirector from '../Redirector'
import Sidebar from '../Sidebar'
import Editor from '../Editor'
import Graph from '../Graph'
import AuthScreen from '../AuthScreen'
import Spinner from '../Spinner'

const App = () => (
  <div className="App">
    <Redirector />
    <Sidebar />
    <div className="features">
      <Editor />
      <Graph />
    </div>
    <AuthScreen />
    <Spinner />
    <ReduxToastr
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </div>
)

export default App
