import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // Disable non-critical rules
      'react/prop-types': 'off', // Disable prop-types warning
      'no-unused-vars': 'off', // Disable unused variable warnings
      'react/jsx-no-target-blank': 'off', // If not needed
      'react-refresh/only-export-components': 'off', // If you don't care about component exports
      'no-console': 'off', // Disable console logs
      // Enable only essential rules
       // Prevent console logs in production
      'no-debugger': 'error', // Prevent debugger statements in production
      'no-undef': 'error', // Ensure undefined variables throw errors
      'no-unreachable': 'error', // Ensure unreachable code is flagged
      'eqeqeq': 'error', // Force strict equality checks
    },
  },
];
