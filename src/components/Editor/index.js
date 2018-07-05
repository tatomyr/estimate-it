import { connect } from 'react-redux'
import Editor from './Editor'
import './styles.css'
import { changeText } from '../../redux/actions'

const mapStateToProps = ({ estimate: { text } }) => ({
  text,
})

const mapDispatchToProps = ({
  changeText,
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
