import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'src/shared/api/schema-api.yml',
  // output: 'src/shared/api/generated',
  output: {
    path: 'src/shared/api/generated',
    postProcess: ['prettier'],
  },
  plugins: ['@pinia/colada'],
});
