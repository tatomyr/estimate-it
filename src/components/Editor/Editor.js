import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

const Editor = ({ text, onTextChange }) => (
  <div className="editor-wrapper">
    <MonacoEditor
      language="python"
      theme="vs-dark"
      value={text}
      options={options}
      onChange={onTextChange}
      editorDidMount={(editor, monaco) => { editor.focus() }}
    />
  </div>
)

Editor.propTypes = {
  text: PropTypes.string,
  onTextChange: PropTypes.func.isRequired,
}

Editor.defaultProps = {
  text: '',
}

export default Editor
