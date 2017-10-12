import React from 'react';
import MonacoEditor from 'react-monaco-editor';
// import { sort, product, toProbGraph } from 'augmented-multiset';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);

  }
  render() {
    const code = this.state.code;
    const options = {
      lineNumbers: false,
      scrollBeyondLastLine: false,
			readOnly: false,
    };
    return (
      <MonacoEditor
        height="600"
        language="python"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange.bind(this)}
        editorDidMount={this.editorDidMount.bind(this)}
      />
    );
  }
}

export default Editor;
