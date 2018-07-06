import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Graph from './Graph'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

export default withRouter(connect(mapStateToProps)(Graph))
