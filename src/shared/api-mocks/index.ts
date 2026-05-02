export const enableApiMocks = async () => {
  const { worker } = await import('./bootstrap');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};
