import { connect } from 'react-redux'
import Editor from './Editor'
import { changeText, recalc } from '../../actions'

const mapStateToProps = ({ estimate: { text } }) => ({
  text,
})

const mapDispatchToProps = dispatch => ({
  onTextChange: (text, e) => {
    dispatch(changeText(text, e))
  },
  recalc: () => {
    dispatch(recalc())
  },
})

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer
