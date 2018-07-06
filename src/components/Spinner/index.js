import { connect } from 'react-redux'
import Spinner from './Spinner'
import './styles.css'

const mapStateToProps = ({ visualEffects: { spinnersCount } }) => ({
  showSpinner: !!spinnersCount,
})

export default connect(mapStateToProps, null)(Spinner)
