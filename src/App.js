import React, { Component } from 'react';

import logo from './keenlogo.jpg';
import './App.css';
import MainLayout from './components/MainLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Estimate It</h1>
        </header>
        <MainLayout />
      </div>
    );
  }
}

export default App;
