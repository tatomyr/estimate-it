import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
// Try `npm install @types/react-monaco-editor` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-monaco-editor';`

const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

const editorWillMount = monaco => {
  this.editor = monaco
  console.log(monaco.languages.getLanguages())
  if (!monaco.languages.getLanguages().mySpecialLanguage) {
    // Register a new language
    monaco.languages.register({ id: 'mySpecialLanguage' })
    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', {
      tokenizer: {
        root: [
          { include: "@whitespace" },
          { include: "@numbers" },
          // TODO: [|=]  - what does it corresponds to?
          [/[,:;\|=]/, "delimiter"],
          [/[{}\[\]()]/, "@brackets"],
          [/^@[a-zA-Z]\w*/, "tag"],
          [/%[a-zA-Z]\w*/, "tag"],
          [/#[a-zA-Z]\w*/, "tag"],
        ],
        whitespace: [
          [/\s+/, "white"],
          [/(^# .*$)/, "comment"],
        ],
        numbers:[
          // [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, "number.hex"],
          [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, "number"],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration('mySpecialLanguage', {
      comments: {
        lineComment: "#",
      },
      brackets:[
        ["{", "}"], ["[", "]"],["(", ")"],
      ],
    });
  }
}

const Editor = ({
  estimate: { text, _id },
  addEstimate,
}) => (
  <div className="editor-wrapper">
    <MonacoEditor
      language="mySpecialLanguage"
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
