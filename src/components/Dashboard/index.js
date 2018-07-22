import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import extract from '../../helpers/extract'

const mapStateToProps = extract({ estimates: 1 })

const mapDispatchToProps = ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
