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
} from '../../redux/actions/async'

const mapStateToProps = ({ creds }) => ({ creds })

const mapDispatchToProps = ({
  checkCreds,
  resetCreds,
  cleanAllEstimates,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthScreen))
