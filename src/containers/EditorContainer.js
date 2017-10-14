import { connect } from 'react-redux';
import Editor from '../components/Editor';
// import { appReducer } from '../reducers/index';

const mapStateToProps = state => ({
  text: state.text,
});

const mapDispatchToProps = dispatch => {
  return {
    onTextChange: (text, e) => {
      dispatch({ type: 'CHANGE_TEXT', text, e });
    },
    onEditorBlur: () => {
      dispatch({ type: 'EDITOR_BLUR' });
    },
  };
}

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default EditorContainer;
