import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './components/Root'
import store from './redux/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()

// Register Monaco Editor web worker
window.MonacoEnvironment = {
  getWorkerUrl: () => '/monaco-editor-worker-loader-proxy.js',
}
