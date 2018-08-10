import { connect } from 'react-redux'
import Redirector from './Redirector'

const mapStateToProps = ({ redirector }) => ({ redirector })

export default connect(mapStateToProps, null)(Redirector)
