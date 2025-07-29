import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbReactHooks from 'eslint-config-airbnb/rules/react-hooks';

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'public/**',
      '.vscode/**',
      '.husky/**',
    ], // 忽略构建输出目录
  },
  // 基础配置
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        es6: true,
        browser: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          generators: false,
          objectLiteralDuplicateProperties: false,
          jsx: true,
        },
      },
    },
    rules: {
      ...airbnbReactHooks.rules,
      ...airbnbReact.rules,
      // 通用规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
      // React 相关规则
      'react/jsx-wrap-multilines': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: ['arrow-function'],
        },
      ],
      // 禁止使用内联的dangerouslySetInnerHTML属性，以避免潜在的安全问题，级别为警告
      'react/no-danger': 'warn',
      // 要求在React Hook中使用所有外部依赖项，以避免潜在的bug，级别为警告
      'react-hooks/exhaustive-deps': 'warn',
      // 禁止定义未使用的prop类型，以保持代码的整洁和避免不必要的类型定义，级别为警告
      'react/no-unused-prop-types': 'warn',
      // 禁止在JSX中使用构造的上下文值，以避免不必要的性能开销和潜在的错误，级别为警告
      'react/jsx-no-constructed-context-values': 'warn',
      'react/require-default-props': 'off',
      //使用解构赋值
      'react/destructuring-assignment': 'warn',
      'react/jsx-closing-tag-location': 'off',
      'react/jsx-one-expression-per-line': 'off',
    },
  },
  // TypeScript 特定配置
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // 只保留 TypeScript 特有的规则
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      // TypeScript 文件的特殊规则
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx', '.ts'] },
      ],
    },
  },
  // 配置文件和声明文件
  {
    files: ['**/*.d.ts', '*.config.ts', 'vite.config.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
