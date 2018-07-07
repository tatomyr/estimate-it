import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Redirector from '../Redirector'
import Sidebar from '../Sidebar'
import Board from '../Board'
import Register from '../Register'
import Spinner from '../Spinner'

const App = () => (
  <div className="App">
    <Redirector />
    <Sidebar />
    <Board />
    <Register />
    <Spinner />
    <ReduxToastr
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </div>
)

export default App
