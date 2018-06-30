import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import './styles.css'
import { recalc } from '../../actions'

const mapDispatchToProps = dispatch => ({
  recalc: () => dispatch(recalc()),
})

export default connect(null, mapDispatchToProps)(Sidebar)
