import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchTitles } from '../../redux/actions/async'
import Dashboard from './Dashboard'
// import './styles.css'
import extract from '../../helpers/extract'

const mapStateToProps = extract({ estimates: 1 })
// FIXME: del
// const mapStateToProps = extract('estimates')
// FIXME: del
// ({ estimates }) => ({
//   estimates,
// })

const mapDispatchToProps = ({
  fetchTitles,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
