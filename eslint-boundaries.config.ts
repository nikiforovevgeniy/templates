import { createConfig, recommended } from 'eslint-plugin-boundaries/config';

const config = createConfig({
  files: ['src/**/*.{ts,vue}'],
  settings: {
    ...recommended.settings,
    'boundaries/elements': [
      { type: 'shared', pattern: 'shared/*' },
      { type: 'entities', pattern: 'entities/*' },
      { type: 'features', pattern: 'features/*' },
      { type: 'pages', pattern: 'pages/*', mode: 'file' },
      { type: 'widgets', pattern: 'widgets/*' },
      { type: 'app', pattern: 'app' },
    ],
  },
  rules: {
    ...recommended.rules,
    'boundaries/dependencies': [
      2,
      {
        default: 'disallow',
        message: '{{from.type}} не может зависеть от {{to.type}}',
        rules: [
          // Разрешаем из app импортировать shared, entities, features, pages, widgets
          {
            from: {
              type: 'app',
            },
            allow: {
              to: {
                type: ['shared', 'entities', 'features', 'pages', 'widgets'],
              },
            },
          },
          // Разрешаем из widgets импортировать shared, entities, features, pages
          {
            from: {
              type: 'widgets',
            },
            allow: {
              to: {
                type: ['shared', 'entities', 'features', 'pages'],
              },
            },
          },
          // Разрешаем из pages импортировать shared, entities, features
          {
            from: {
              type: 'pages',
            },
            allow: {
              to: {
                type: ['shared', 'entities', 'features'],
              },
            },
          },
          // Разрешаем из features импортировать shared, entities
          {
            from: {
              type: 'features',
            },
            allow: {
              to: {
                type: ['shared', 'entities'],
              },
            },
          },
          // Разрешаем из entities импортировать shared
          {
            from: {
              type: 'entities',
            },
            allow: {
              to: {
                type: ['shared'],
              },
            },
          },
          // Разрешаем из shared импортировать shared
          {
            from: {
              type: 'shared',
            },
            allow: {
              to: {
                type: ['shared'],
              },
            },
          },
          // Запрещаем из entities, features, widgets импортировать что-то кроме index.ts (public api)
          {
            to: {
              type: ['entities', 'features', 'widgets'],
              internalPath: '!index.ts',
            },
            disallow: {
              from: {
                type: '*',
              },
            },
            message: 'Нарушение public api',
          },
        ],
      },
    ],
  },
});

export const eslintBoundaries = {
  ...config,
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    ...config.settings,
  },
};
