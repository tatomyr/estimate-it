import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './components/Root'
import './index.css'
import store from './redux/store'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
