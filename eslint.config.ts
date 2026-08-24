import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { eslintBoundaries } from './eslint-boundaries.config.ts';

export default withNuxt(eslintBoundaries, eslintPluginPrettier);
