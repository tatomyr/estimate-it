import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AuthScreen from './AuthScreen'
import './styles.css'
import {
  closeAuthScreen,
  cleanEstimate,
  resetCreds,
} from '../../redux/actions'
import {
  checkCreds,
  openGuestSession,
} from '../../redux/actions/async'

const mapStateToProps = ({ creds: { apiKey } }) => ({
  apiKey,
})

const mapDispatchToProps = ({
  checkCreds,
  closeAuthScreen,
  cleanEstimate,
  openGuestSession,
  resetCreds,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthScreen))
