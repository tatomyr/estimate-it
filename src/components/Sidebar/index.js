import { connect } from 'react-redux'
import { action } from '../../redux'
import Sidebar from './Sidebar'
import './styles.css'
import { recalc, redirect } from '../../actions'

const mapDispatchToProps = dispatch => ({
  recalc: () => dispatch(recalc()),
  saveEstimate: () => action('SAVE_ESTIMATE'),
  // TODO: implement redirecting to `new estimate`
  redirect: pathToRedirect => dispatch(redirect(pathToRedirect)),
})

export default connect(null, mapDispatchToProps)(Sidebar)
