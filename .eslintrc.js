
module.exports = {
  "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2017,
    },
    "env": {
        "es6": true,
        "amd": true,
        "node": true,
        "commonjs": true,
        "jest": true,
        "browser": true
    },
    "globals": {
      "exampleGlobalVariable": true,
      "_": false
    },
    "extends": "plugin:react/recommended",
    "rules": {
      "eqeqeq": 1,
      "no-console": "off",
      "indent": ["error", 2],
      "quotes": ["error","single"],
      "semi": [2,"always"],
      "linebreak-style": ["error","unix"],
      "no-underscore-dangle":  ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }]
    },
    "plugins": [
    ],
    "settings": {
      "react": {
          "version": require('./package.json').dependencies.react,
      },
  },
  };
  