import { createConfig, recommended } from 'eslint-plugin-boundaries/config';

const config = createConfig({
  files: ['src/**/*.{ts,tsx}'],
  settings: {
    ...recommended.settings,
    'boundaries/elements': [
      { type: 'shared', pattern: 'shared/*' },
      { type: 'entities', pattern: 'entities/*' },
      { type: 'features', pattern: ['features/*/*', 'features/*'] },
      { type: 'widgets', pattern: 'widgets/*' },
      { type: 'app', pattern: 'app' },
    ],
    // Важно: в отличие от element-паттернов, file-паттерны не матчатся справа налево,
    // поэтому нужен префикс "**/"
    'boundaries/files': [{ category: 'page', pattern: '**/pages/**/*.tsx' }],
  },
  rules: {
    ...recommended.rules,
    'boundaries/dependencies': [
      2,
      {
        default: 'disallow',
        // У page-файлов нет элемента, у элементов нет file-категории,
        // поэтому подставляем оба поля: заполнено всегда ровно одно.
        message:
          '{{from.type}}{{from.file.categories}} не может зависеть от {{to.type}}{{to.file.categories}}',
        policies: [
          // Разрешаем из app импортировать shared, entities, features, widgets, page
          {
            from: { element: { type: 'app' } },
            allow: {
              to: [
                {
                  element: {
                    type: ['shared', 'entities', 'features', 'widgets'],
                  },
                },
                { file: { categories: ['page'] } },
              ],
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
            disallow: {
              from: [
                { element: { type: '*' } },
                { file: { categories: ['page'] } },
              ],
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
        project: ['./tsconfig.app.json'],
      },
    },
    ...config.settings,
  },
};
