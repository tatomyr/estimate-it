import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import './styles.css'
import {
  recalc,
  openAuthScreen,
  closeAuthScreen,
  minifyGraph,
  enlargeGraph,
} from '../../redux/actions'
import {
  saveEstimate,
} from '../../redux/actions/async'

const mapStateToProps = ({
  estimates,
  creds: { username },
  visualEffects: { graphView },
}) => ({
  estimates,
  username,
  graphView,
})

const mapDispatchToProps = ({
  recalc,
  saveEstimate,
  openAuthScreen,
  closeAuthScreen,
  minifyGraph,
  enlargeGraph,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
