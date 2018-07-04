import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import './styles.css'
import { recalc, redirect, saveEstimate } from '../../redux/actions'

const mapDispatchToProps = ({
  recalc,
  saveEstimate,
  // TODO: implement redirecting to `new estimate`
  redirect,
})

export default withRouter(connect(null, mapDispatchToProps)(Sidebar))
