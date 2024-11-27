import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['dist'] // Ignorer les fichiers ou dossiers spécifiques
  },
  js.configs.recommended, // Configuration recommandée pour JavaScript
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Cible les fichiers pertinents
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser, // Utilisation du parser TypeScript
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true // Activer le support JSX
        }
      }
    },
    plugins: {
      react, // Plugin React
      'react-hooks': reactHooks, // Plugin React Hooks
      'react-refresh': reactRefresh, // Plugin React Refresh
      '@typescript-eslint': tsPlugin // Plugin TypeScript
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Règles recommandées pour React Hooks
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }] // Limiter l'usage de console
    }
  }
];
