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

const mapStateToProps = ({ creds }) => ({ creds })

const mapDispatchToProps = ({
  checkCreds,
  resetCreds,
  cleanAllEstimates,
  redirect,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthScreen))
