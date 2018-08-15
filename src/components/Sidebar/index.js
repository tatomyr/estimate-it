import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import './styles.css'
import {
  recalc,
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
  minifyGraph,
  enlargeGraph,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
