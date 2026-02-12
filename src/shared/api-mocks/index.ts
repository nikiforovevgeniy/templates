import { setupWorker } from 'msw/browser';
import { exampleHandlers } from './exampleHandlers';

const worker = setupWorker(...exampleHandlers);

export const enableApiMocks = async () => {
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};
