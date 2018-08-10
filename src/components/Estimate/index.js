import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  updateEstimate,
  enlargeGraph,
} from '../../redux/actions'
import { getEstimate } from '../../redux/actions/async'
import Estimate from './Estimate'
import './styles.css'

const mapStateToProps = ({
  estimates,
  visualEffects: { graphView },
}) => ({
  estimates,
  graphView,
})

const mapDispatchToProps = ({
  updateEstimate,
  getEstimate,
  enlargeGraph,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Estimate))
