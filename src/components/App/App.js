import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Editor from '../Editor'
import Graph from '../Graph'
import Sidebar from '../Sidebar'
import Spinner from '../Spinner'
import Redirector from '../Redirector'

const App = ({ match: { params }, getEstimate }) => {
  getEstimate(params)

  return (
    <div className="App">
      <Redirector />
      <Sidebar />
      <div className="features">
        <Editor />
        <Graph />
      </div>
      <Spinner />
      <ReduxToastr
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  )
}

export default App
