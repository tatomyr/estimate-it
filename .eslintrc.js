module.exports = {
  extends: "airbnb",
  env: {
    browser: true,
  },
  parser: "babel-eslint",
  rules: {
    semi: ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "react/prop-types": "warn",
    "jsx-a11y/label-has-for": [2, {
      "components": ["Label"],
      "required": {
          "every": ["id"],
      },
      "allowChildren": false,
    }],
  },
};
