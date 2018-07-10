import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import { options, languageDef, configuration } from './editor-config'

const editorWillMount = monaco => {
  this.editor = monaco
  if (!monaco.languages.getLanguages().estimateMarkdown) {
    // Register a new language
    monaco.languages.register({ id: 'estimateMarkdown' })
    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('estimateMarkdown', languageDef)
    // Set the editing configuration for the language
    monaco.languages.setLanguageConfiguration('estimateMarkdown', configuration)
  }
  console.log(monaco.languages.getLanguages())
}

const Editor = ({
  estimate: { text, _id },
  addEstimate,
}) => (
  <div className="editor-wrapper">
    <MonacoEditor
      language="estimateMarkdown"
      theme="vs-dark"
      value={text}
      options={options}
      onChange={newText => addEstimate({ text: newText, _id })}
      editorWillMount={editorWillMount}
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
