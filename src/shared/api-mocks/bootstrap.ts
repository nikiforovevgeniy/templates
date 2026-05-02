import { setupWorker } from 'msw/browser';
import { exampleHandlers } from './exampleHandlers';

export const worker = setupWorker(...exampleHandlers);
