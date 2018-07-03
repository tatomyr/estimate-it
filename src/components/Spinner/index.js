import { connect } from 'react-redux'
import Spinner from './Spinner'
import './styles.css'

const mapStateToProps = ({ visualEffects: { showSpinner } }) => ({
  showSpinner,
})

export default connect(mapStateToProps, null)(Spinner)
