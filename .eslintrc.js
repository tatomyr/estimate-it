module.exports = {
  extends: "airbnb",
  env: {
    browser: true,
  },
  rules: {
    semi: ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "react/prop-types": "warn",
  },
};
