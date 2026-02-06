import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintTailwind from 'eslint-plugin-tailwindcss'

import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintSimpleSort from 'eslint-plugin-simple-import-sort'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

import nextPlugin from '@next/eslint-plugin-next'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    '.next',
    'out',
    'coverage',
    'node_modules',
  ]),

  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],

    extends: [
      js.configs.recommended,

      ...tseslint.configs.recommended,

      nextPlugin.configs.recommended,
      nextPlugin.configs['core-web-vitals'],
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        projectService: true,
      },
    },

    plugins: {
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'simple-import-sort': eslintSimpleSort,
      prettier: prettierPlugin,
      tailwindcss: eslintTailwind,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...eslintReact.configs.recommended.rules,
      ...eslintReactHooks.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',

      ...eslintTailwind.configs['flat/recommended'].rules,

      'tailwindcss/no-contradicting-classname': 'error',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },      

])
