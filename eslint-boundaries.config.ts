import { createConfig, recommended } from 'eslint-plugin-boundaries/config';

const config = createConfig({
  files: ['src/**/*.{ts,vue}'],
  settings: {
    ...recommended.settings,
    'boundaries/elements': [
      { type: 'shared', pattern: 'shared/*' },
      { type: 'entities', pattern: 'entities/*' },
      { type: 'features', pattern: ['features/*/*', 'features/*'] },
      { type: 'widgets', pattern: 'widgets/*' },
      { type: 'app', pattern: 'global' },
    ],
    // Важно: в отличие от element-паттернов, file-паттерны не матчатся справа налево,
    // поэтому нужен префикс "**/"
    'boundaries/files': [{ category: 'page', pattern: '**/pages/**/*.vue' }],
  },
  rules: {
    ...recommended.rules,
    'boundaries/dependencies': [
      2,
      {
        default: 'disallow',
        message: '{{from.type}} не может зависеть от {{to.type}}',
        policies: [
          // Разрешаем из app импортировать shared, entities, features, widgets
          {
            from: { element: { type: 'app' } },
            allow: {
              to: {
                element: {
                  type: ['shared', 'entities', 'features', 'widgets'],
                },
              },
            },
          },
          // Разрешаем из app импортировать страницы (page-файлы)
          {
            from: { element: { type: 'app' } },
            allow: {
              to: {
                file: {
                  categories: ['page'],
                },
              },
            },
          },
          // Разрешаем из pages импортировать shared, entities, features, widgets
          {
            from: {
              file: {
                categories: ['page'],
              },
            },
            allow: {
              to: {
                element: {
                  type: ['shared', 'entities', 'features', 'widgets'],
                },
              },
            },
          },
          // Разрешаем из widgets импортировать shared, entities, features
          {
            from: { element: { type: ['widgets'] } },
            allow: {
              to: { element: { type: ['shared', 'entities', 'features'] } },
            },
          },
          // Разрешаем из features импортировать shared, entities
          {
            from: { element: { type: 'features' } },
            allow: { to: { element: { type: ['shared', 'entities'] } } },
          },
          // Разрешаем из entities импортировать shared
          {
            from: { element: { type: 'entities' } },
            allow: { to: { element: { type: ['shared'] } } },
          },
          // Разрешаем из shared импортировать shared
          {
            from: { element: { type: 'shared' } },
            allow: { to: { element: { type: ['shared'] } } },
          },
          // Запрещаем импортировать что-то кроме index.ts (public api)
          {
            to: {
              element: {
                type: ['entities', 'features', 'widgets'],
                fileInternalPath: '!index.ts',
              },
            },
            disallow: { from: { element: { type: '*' } } },
            message: 'Нарушение public api',
          },
          // Page-файлы — точки входа роутера: импортировать их нельзя ниоткуда
          {
            to: { file: { categories: ['page'] } },
            disallow: {
              from: [
                { element: { type: '*' } },
                { file: { categories: ['page'] } },
              ],
            },
            message: 'Импортировать page-файлы запрещено',
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
