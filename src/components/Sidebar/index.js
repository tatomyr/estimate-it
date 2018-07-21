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

const mapDispatchToProps = ({
  recalc,
  saveEstimate,
  openAuthScreen,
  closeAuthScreen,
})

export default withRouter(connect(null, mapDispatchToProps)(Sidebar))