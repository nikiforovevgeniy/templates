import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { enableApiMocks } from '@/shared/api-mocks/index.ts';

(async () => {
  if (import.meta.env.VITE_ENABLE_API_MOCKS == 'true') {
    await enableApiMocks();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
