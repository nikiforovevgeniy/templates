import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'src/shared/api/schema-api.yml',
  output: 'src/shared/api/generated',
  plugins: ['@pinia/colada'],
});
