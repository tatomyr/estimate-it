import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import { options, languageDef, configuration } from './editor-config'
import { estimateType } from '../../helpers/propTypes'

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
}

const Editor = ({
  estimate: { text, _id },
  updateEstimate,
}) => (
  <MonacoEditor
    language="estimatemd"
    theme="vs-dark"
    value={text}
    options={options}
    onChange={newText => updateEstimate({ text: newText, _id })}
    editorWillMount={editorWillMount}
    editorDidMount={editor => { editor.focus() }}
  />
)

Editor.propTypes = {
  estimate: estimateType.isRequired,
  updateEstimate: PropTypes.func.isRequired,
}

export default Editor
