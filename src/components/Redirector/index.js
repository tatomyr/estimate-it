import { connect } from 'react-redux'
import Redirector from './Redirector'

const mapStateToProps = ({ redirector: { href } }) => ({ href })

export default connect(mapStateToProps, null)(Redirector)
