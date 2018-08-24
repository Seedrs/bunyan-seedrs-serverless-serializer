module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "commonjs": true,
    "jest/globals": true
  },
  "parser": "babel-eslint",
  "settings": {
    "import/resolver": {
      "node": {},
      "babel-module": {}
    }
  },
  "plugins": ["jest","import"],
  "extends": [
    "eslint:recommended",
    "@seedrs/eslint-config-seedrs-base"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  }
};
