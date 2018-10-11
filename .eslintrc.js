module.exports = {
  env: {
    es6: true,
    node: true
  },

  extends: ['airbnb-base', 'plugin:prettier/recommended'],

  // plugins: ['prettier'],

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  rules: {
    // 'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: ['error', 'single'],
  }
};
