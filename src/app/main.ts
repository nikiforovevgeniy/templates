import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
import { VueQuery, VueQueryConfig } from './vue-query';
import { enableApiMocks } from '@/shared/api-mocks';

(async () => {
  if (import.meta.env.VITE_ENABLE_API_MOCKS == 'true') {
    await enableApiMocks();
  }

  createApp(App).use(router).use(VueQuery, VueQueryConfig).mount('#app');
})();
