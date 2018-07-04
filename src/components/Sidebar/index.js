import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import './styles.css'
import { recalc, redirect, saveEstimate } from '../../actions'

const mapDispatchToProps = ({
  recalc,
  saveEstimate,
  // TODO: implement redirecting to `new estimate`
  redirect,
})

export default connect(null, mapDispatchToProps)(Sidebar)
