/* eslint-disable quotes */

export const options = {
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
}

export const languageDef = {
  defaultToken: "",
  number: /\d+(\.\d+)?/,
  tokenizer: {
    root: [
      { include: "@whitespace" },
      { include: "@numbers" },
      { include: "@strings" },
      [/^[@%][a-zA-Z]\w*/, "tag"],
      [/#[a-zA-Z]\w*/, "tag"],
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
  },
}

export const configuration = {
  comments: {
    lineComment: "#",
  },
  brackets: [
    ["{", "}"], ["[", "]"], ["(", ")"],
  ],
}

/* eslint-enable quotes */
