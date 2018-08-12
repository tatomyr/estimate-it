import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AuthScreen from './AuthScreen'
import './styles.css'
import {
  cleanAllEstimates,
  resetCreds,
} from '../../redux/actions'
import {
  checkCreds,
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
  cleanAllEstimates,
  resetCreds,
  redirect,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthScreen))
