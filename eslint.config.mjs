import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prefer-const': 'warn',
      eqeqeq: ['warn', 'smart'],
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
];
