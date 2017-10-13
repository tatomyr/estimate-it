import { connect } from 'react-redux';
import Editor from '../components/Editor';
// import { appReducer } from '../reducers/index';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    onTextChange: (text, e) => {
      dispatch({ type: 'CHANGE_TEXT', text, e })
    }
  }
}

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer;
