import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addEstimate } from '../../redux/actions'
import { getEstimate } from '../../redux/actions/async'
import Estimate from './Estimate'
import './styles.css'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

const mapDispatchToProps = ({
  addEstimate,
  getEstimate,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Estimate))
