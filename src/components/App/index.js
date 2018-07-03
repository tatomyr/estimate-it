import { connect } from 'react-redux'
import App from './App'
import './styles.css'
import { setParams } from '../../actions'
import { action } from '../../redux'

const mapDispatchToProps = dispatch => ({
  setParams: payload => dispatch(setParams(payload)),
  getEstimate: () => action('GET_ESTIMATE'),
})

export default connect(null, mapDispatchToProps)(App)
