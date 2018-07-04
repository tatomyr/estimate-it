import { connect } from 'react-redux'
import App from './App'
import './styles.css'
import { setParams, getEstimate } from '../../actions'

const mapDispatchToProps = ({
  setParams,
  getEstimate,
})

export default connect(null, mapDispatchToProps)(App)
