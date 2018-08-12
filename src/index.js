import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './components/Root'
import store from './redux/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

// Register Monaco Editor web worker before the other stuff
window.MonacoEnvironment = {
  // We assume that we're using HashRouter from react-router-dom
  getWorkerUrl: () => `${document.location.pathname}monaco-editor-worker-loader-proxy.js`,
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
