import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

const Editor = ({
  estimate: { text, _id },
  addEstimate,
}) => (
  <div className="editor-wrapper">
    <MonacoEditor
      language="python"
      theme="vs-dark"
      value={text}
      options={options}
      onChange={newText => addEstimate({ text: newText, _id })}
      editorDidMount={(editor, monaco) => { editor.focus() }}
    />
  </div>
)

Editor.propTypes = {
  estimate: PropTypes.shape({
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  addEstimate: PropTypes.func.isRequired,
}

export default Editor
