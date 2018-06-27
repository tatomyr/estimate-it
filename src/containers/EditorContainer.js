import { connect } from 'react-redux'
import Editor from '../components/Editor'
import { changeText, editorBlur } from '../actions'

const mapStateToProps = ({ appData: { text }}) => ({
  text,
})

const mapDispatchToProps = dispatch => ({
  onTextChange: (text, e) => {
    dispatch(changeText(text, e))
  },
  onEditorBlur: () => {
    dispatch(editorBlur())
  },
})

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer
