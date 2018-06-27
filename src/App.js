import React from 'react'

import logo from './keenlogo.jpg'
import './App.css'
// import MainLayout from './components/MainLayout'
import Editor from './components/Editor'
import Graph from './components/Graph'

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">
        Estimate It
      </h1>
    </header>
    <div>
      <Editor />
      <Graph />
    </div>
  </div>
)

export default App
