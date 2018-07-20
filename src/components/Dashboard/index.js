import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getEstimate } from '../../redux/actions/async'
import Dashboard from './Dashboard'
// import './styles.css'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

const mapDispatchToProps = ({
  getEstimate,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
