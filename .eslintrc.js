module.exports = {
  extends: "airbnb",
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    semi: ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "react/prop-types": "warn",
  },
};
