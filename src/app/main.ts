import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
import { createPinia } from 'pinia';
import { PiniaColada } from '@pinia/colada';
import { enableApiMocks } from '@/shared/api-mocks';

(async () => {
  if (import.meta.env.VITE_ENABLE_API_MOCKS == 'true') {
    await enableApiMocks();
  }

  createApp(App).use(router).use(createPinia()).use(PiniaColada).mount('#app');
})();
