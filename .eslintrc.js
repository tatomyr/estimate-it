module.exports = {
  extends: "airbnb",
  env: {
    browser: true,
  },
  parser: "babel-eslint",
  rules: {
    semi: ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".js"] }],
    "react/prop-types": "error",
    "jsx-a11y/label-has-for": ["error", {
      "components": ["Label"],
      "required": {
          "every": ["id"],
      },
      "allowChildren": false,
    }],
    "no-underscore-dangle": ["error", {
      "allow": [
        "_id",
        "_changed",
      ],
    }],
    "react/destructuring-assignment": ["warn", "always"],
    "import/prefer-default-export": ["off"],
  },
};
