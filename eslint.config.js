const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const noZustandDestructure = require('./eslint-rules/no-zustand-destructure.js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/*.config.ts',
      '**/*.config.js',
      '**/babel.config.json',
      '**/jest.config.js',
      'eslint-rules/**',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      local: {
        rules: {
          'no-zustand-destructure': noZustandDestructure,
        },
      },
    },
    rules: {
      // The only thing ESLint handles — the custom Zustand rule
      'local/no-zustand-destructure': 'error',

      // Enforce TypeScript-only — no .js/.jsx imports
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/\\.jsx?$/]',
          message: 'Import JS/JSX files is not allowed — TypeScript only.',
        },
      ],
    },
  },
];
