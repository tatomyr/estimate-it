/* eslint-disable quotes */

// This config defines the editor's view.
export const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

// This config defines how the language is displayed in the editor.
export const languageDef = {
  defaultToken: "",
  number: /\d+(\.\d+)?/,
  keywords: [
    "@project",
    "@developer",
    "@pm",
    "@comment",
    "@summary",
    "@rounding",
  ],
  tokenizer: {
    root: [
      { include: "@whitespace" },
      { include: "@numbers" },
      { include: "@strings" },
      { include: "@tags" },
      [/^@\w+/, { cases: { "@keywords": "keyword" } }],
    ],
    whitespace: [
      [/^\s*# .*$/, "comment"],
      [/\s+/, "white"],
    ],
    numbers:[
      [/@number/, "number"],
    ],
    strings: [
      [/[=|][ @number]*$/, "string.escape"],
    ],
    tags: [
      [/^%[a-zA-Z]\w*/, "tag"],
      [/#[a-zA-Z]\w*/, "tag"],
    ],
  },
}

// This config defines the editor's behavior.
export const configuration = {
  comments: {
    lineComment: "#",
  },
  brackets: [
    ["{", "}"], ["[", "]"], ["(", ")"],
  ],
}

/* eslint-enable quotes */
