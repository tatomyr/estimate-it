import { connect } from 'react-redux'
import App from './App'
import './styles.css'
import {
  checkCreds,
} from '../../redux/actions/async'

const mapStateToProps = ({ visualEffects: { showAuthScreen } }) => ({
  showAuthScreen,
})

const mapDispatchToProps = ({
  checkCreds,
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
