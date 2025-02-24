import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbReactHooks from 'eslint-config-airbnb/rules/react-hooks';
import bestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import errors from 'eslint-config-airbnb-base/rules/errors';
import style from 'eslint-config-airbnb-base/rules/style';
// import variables from 'eslint-config-airbnb-base/rules/variables';
import es6 from 'eslint-config-airbnb-base/rules/es6';
// import imports from 'eslint-config-airbnb-base/rules/imports';
import strict from 'eslint-config-airbnb-base/rules/strict';

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default [
  // 引入 Airbnb 的配置
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    extends: ['prettier'],
    languageOptions: {
      globals: {
        es6: true,
      },
      parserOptions: {
        parserOptions: {
          ecmaVersion: 2018,
          sourceType: 'module',
          ecmaFeatures: {
            generators: false,
            objectLiteralDuplicateProperties: false,
          },
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // ...bestPractices.rules,
      // ...errors.rules,
      // ...style.rules,
      // // ...variables.rules, ??
      // ...es6.rules,
      // // ...imports.rules, ??
      // ...strict.rules,
      ...airbnbReactHooks.rules,
      ...airbnbReact.rules,
    },
  },
  // TypeScript 配置
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx', '.ts'] },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
