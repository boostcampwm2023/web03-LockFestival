import { setupWorker } from 'msw/browser';
import profileHandlers from './handlers/profileHandlers';

export const worker = setupWorker(...profileHandlers);
