import React from 'react'
// import logo from './keenlogo.jpg'
import './styles.css'
import Editor from '../Editor'
import Graph from '../Graph'
import Sidebar from '../Sidebar'

const App = () => (
  <div className="App">
    <Sidebar />
    <div className="features">
      <Editor />
      <Graph />
    </div>
  </div>
)

export default App
