module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended" ],
  "rules": {
    "array-bracket-spacing": ["error", "always"],
    "indent": [ "error", 2, ],
    "comma-dangle" : [ "error", "always" ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "object-curly-spacing": ["error", "always"],
    "quotes": [
      "error",
      "single"
    ],
    "react/jsx-curly-spacing": [2, "always"],
    "semi": [
      "error",
      "always"
    ],
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true,
      }
  },
  "plugins": [
    "react"
    ],
};
