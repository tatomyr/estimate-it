import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Editor from './Editor'
import './styles.css'
import { addEstimate } from '../../redux/actions'

const mapStateToProps = ({ estimates }) => ({
  estimates,
})

const mapDispatchToProps = ({
  addEstimate,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor))
