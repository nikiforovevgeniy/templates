import { createRouter, createWebHistory } from 'vue-router';

const routes = [{ path: '/', component: () => import('@/pages/MainPage.vue') }];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
