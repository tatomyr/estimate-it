import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Component from './Component'
import './styles.css'
import { checkCreds, saveCreds, getEstimate } from '../../redux/actions'

const mapStateToProps = ({ apiKey: { hasKey } }) => ({
  hasKey,
})

const mapDispatchToProps = ({
  checkCreds,
  saveCreds,
  getEstimate,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
