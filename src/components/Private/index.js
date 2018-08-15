import { connect } from 'react-redux'
import Private from './Private'
import { checkCreds } from '../../redux/actions/async'

const mapStateToProps = ({ creds }) => ({ creds })

const mapDispatchToProps = ({ checkCreds })

export default connect(mapStateToProps, mapDispatchToProps)(Private)
