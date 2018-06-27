import React from 'react'
import MonacoEditor from 'react-monaco-editor';

const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

const Editor = ({
  text,
  onTextChange,
  onEditorBlur,
}) => (
  <div
    style={{ textAlign: 'left' }}
    onBlur={onEditorBlur}
  >
    <MonacoEditor
      height="600"
      language="python"
      theme="vs-dark"
      value={text}
      options={options}
      onChange={onTextChange}
      editorDidMount={(editor, monaco) => { editor.focus() }}
    />
  </div>
)

export default Editor
