module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended" ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
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
