import { connect } from 'react-redux'
import App from './App'
import './styles.css'
import { getEstimate } from '../../redux/actions'

const mapDispatchToProps = ({
  getEstimate,
})

export default connect(null, mapDispatchToProps)(App)
