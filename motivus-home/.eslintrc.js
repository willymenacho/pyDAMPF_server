module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'react-app'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['prettier', 'react'],
  rules: {
    'prettier/prettier': 'warn',
    indent: ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'warn',
      {
        code: 80,
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-unused-vars': ['warn'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-multi-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'warn',
  },
}
