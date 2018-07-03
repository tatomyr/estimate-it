import { connect } from 'react-redux'
import Redirector from './Redirector'

const mapStateToProps = ({ redirector: { pathToRedirect } }) => ({ pathToRedirect })

export default connect(mapStateToProps, null)(Redirector)
