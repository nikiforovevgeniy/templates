import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './schema-api.yml',
    },
    output: {
      target: './generated',
      schemas: './generated/types',
      mode: 'tags',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        // aliasCombinedTypes: true,
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
