import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const Editor = props => (
  <div style={{ textAlign: 'left' }}>
    <MonacoEditor
      height="600"
      language="python"
      theme="vs-dark"
      value={props.text}
      options={{
        lineNumbers: false,
        scrollBeyondLastLine: false,
        readOnly: false,
      }}
      onChange={props.onTextChange}
      editorDidMount={(editor, monaco) => { editor.focus() }}
    />
  </div>
);

export default Editor;
