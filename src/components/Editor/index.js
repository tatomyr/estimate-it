import { connect } from 'react-redux'
import Editor from './Editor'
import './styles.css'
import { changeText } from '../../redux/actions'

const mapStateToProps = ({ estimate: { text } }) => ({
  text,
})

const mapDispatchToProps = dispatch => ({
  onTextChange: (text, e) => {
    dispatch(changeText(text, e))
  },
})

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer
