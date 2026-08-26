import { createConfig, recommended } from 'eslint-plugin-boundaries/config';

const config = createConfig({
  files: ['app/**/*.{ts,vue}'],
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
    // Запрещаем импортировать файлы вне слоёв (app/components, app/plugins, app/layouts, ...)
    'boundaries/no-unknown-files': 2,
    'boundaries/dependencies': [
      2,
      {
        default: 'disallow',
        // У page-файлов нет элемента, у элементов нет file-категории,
        // поэтому подставляем оба поля: заполнено всегда ровно одно.
        message:
          '{{from.type}}{{from.file.categories}} не может зависеть от {{to.type}}{{to.file.categories}}',
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
          // Page-файлы — точки входа роутера: импортировать их нельзя ниоткуда,
          // включая app. Политика идёт последней, чтобы её не перебило разрешение выше.
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
        // paths с алиасами ~/ и @/ лежат в сгенерированном Nuxt конфиге.
        // Без этого алиасы не резолвятся и правила молча ничего не проверяют.
        project: ['./.nuxt/tsconfig.app.json'],
      },
    },
    ...config.settings,
  },
};
