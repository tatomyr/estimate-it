import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './Root'
import './index.css'
import store from './redux'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
