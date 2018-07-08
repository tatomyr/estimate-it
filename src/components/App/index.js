import { connect } from 'react-redux'
import App from './App'
import './styles.css'
import {
  checkCreds,
} from '../../redux/actions/async'

const mapStateToProps = ({ apiKey: { apiKey }, visualEffects: { showAuthScreen } }) => ({
  apiKey,
  showAuthScreen,
})

const mapDispatchToProps = ({
  checkCreds,
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
