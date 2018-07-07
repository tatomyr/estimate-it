import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Board from './Board'
import './styles.css'
import { addEstimate } from '../../redux/actions'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

const mapDispatchToProps = ({
  addEstimate,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))
