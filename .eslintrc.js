module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    'no-console': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  },
  options: {
    code: 120
  }
};
