// @ts-check

import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginVue from 'eslint-plugin-vue';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { eslintBoundaries } from './eslint-boundaries.config.ts';

export default defineConfig(
  { ignores: ['*.d.ts', '**/dist'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],
  eslintBoundaries,
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      // your rules
    },
  },
  eslintPluginPrettierRecommended
);
