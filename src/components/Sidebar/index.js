import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import './styles.css'
import {
  recalc,
  openAuthScreen,
  closeAuthScreen,
} from '../../redux/actions'
import {
  saveEstimate,
} from '../../redux/actions/async'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

const mapDispatchToProps = ({
  recalc,
  saveEstimate,
  openAuthScreen,
  closeAuthScreen,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
