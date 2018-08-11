import { connect } from 'react-redux'
import SideButton from './SideButton'
import { redirect } from '../../redux/actions/async'
import './styles.css'

export default connect(null, ({ redirect }))(SideButton)
