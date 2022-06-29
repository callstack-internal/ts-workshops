module.exports = {
  extends: '@callstack/eslint-config',
  plugins: ['import'],
  rules: {
    'import/order': 0,
    'import/no-unresolved': 'error',
    'react-native/no-unused-styles': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
