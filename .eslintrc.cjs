module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    '@edqe/eslint-config'
  ],
  'parser': '@typescript-eslint/parser',
  'rules': {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'semi': [
      'error',
      'always'
    ],
    'react/react-in-jsx-scope': 'off',
  }
};
