import React from 'react'
import logo from './keenlogo.jpg'
import './App.css'
import Editor from './components/Editor'
import Graph from './components/Graph'
import Sidebar from './components/Sidebar'

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
