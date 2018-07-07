import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Component from './Component'
import './styles.css'
import {
  closeAuthScreen,
  cleanEstimate,
  resetCreds,
} from '../../redux/actions'
import {
  checkCreds,
  getEstimate,
  openGuestSession,
} from '../../redux/actions/async'

const mapStateToProps = ({ apiKey: { apiKey }, visualEffects: { showAuthScreen } }) => ({
  apiKey,
  showAuthScreen,
})

const mapDispatchToProps = ({
  checkCreds,
  getEstimate,
  closeAuthScreen,
  cleanEstimate,
  openGuestSession,
  resetCreds,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
