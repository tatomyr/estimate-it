import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

const mapStateToProps = ({ creds: { username } }) => ({
  username,
})

export default withRouter(connect(mapStateToProps, null)(ProtectedRoute))
