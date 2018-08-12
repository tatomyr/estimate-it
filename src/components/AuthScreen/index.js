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
  redirect,
} from '../../redux/actions/async'

const mapStateToProps = ({
  creds: {
    username,
    checkingCreds,
  },
}) => ({
  username,
  checkingCreds,
})

const mapDispatchToProps = ({
  checkCreds,
  closeAuthScreen,
  cleanEstimate,
  openGuestSession,
  resetCreds,
  redirect,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthScreen))
