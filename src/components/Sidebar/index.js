import { connect } from 'react-redux'
import { action } from '../../redux'
import Sidebar from './Sidebar'
import './styles.css'
import { recalc } from '../../actions'

const mapDispatchToProps = dispatch => ({
  recalc: () => dispatch(recalc()),
  saveEstimate: () => action('SAVE_ESTIMATE'),
})

export default connect(null, mapDispatchToProps)(Sidebar)
