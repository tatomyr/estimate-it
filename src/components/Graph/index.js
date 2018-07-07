import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Graph from './Graph'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

export default withRouter(connect(mapStateToProps)(Graph))
// TODO: wrap Graph with Editor and ¿Table? into one component so they will receive one bunch of props
