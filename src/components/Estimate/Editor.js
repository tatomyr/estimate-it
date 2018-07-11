import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import { options, languageDef, configuration } from './editor-config'

const editorWillMount = monaco => {
  this.editor = monaco
  if (!monaco.languages.getLanguages().some(({ id }) => id === 'estimatemd')) {
    // Register a new language
    monaco.languages.register({ id: 'estimatemd' })
    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('estimatemd', languageDef)
    // Set the editing configuration for the language
    monaco.languages.setLanguageConfiguration('estimatemd', configuration)
  }
  console.log(monaco.languages.getLanguages())
}

const Editor = ({
  estimate: { text, _id },
  updateEstimate,
}) => (
  <div className="editor-wrapper">
    <MonacoEditor
      language="estimatemd"
      theme="vs-dark"
      value={text}
      options={options}
      onChange={newText => updateEstimate({ text: newText, _id })}
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
  updateEstimate: PropTypes.func.isRequired,
}

export default Editor
