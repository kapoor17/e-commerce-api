module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    '../../.eslintrc',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'function-expression',
      },
    ],
    '@typescript-eslint/comma-dangle': 'off',
  },
  parserOptions: {
    project: './packages/client/tsconfig.json',
  },
};
