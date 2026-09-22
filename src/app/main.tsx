import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

(async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_MOCKS === 'true') {
    const { enableApiMocks } = await import('@/shared/api-mocks/index.ts');
    await enableApiMocks();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
