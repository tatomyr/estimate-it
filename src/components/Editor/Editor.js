import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

const Editor = ({
  estimates,
  addEstimate,
  match: { params: { estimateId } },
}) => (
  <div className="editor-wrapper">
    <MonacoEditor
      language="python"
      theme="vs-dark"
      value={(estimates[estimateId] || {}).text}
      options={options}
      onChange={text => addEstimate({ text, _id: estimateId })}
      editorDidMount={(editor, monaco) => { editor.focus() }}
    />
  </div>
)

Editor.propTypes = {
  estimates: PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  addEstimate: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Editor
