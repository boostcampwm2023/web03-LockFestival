import { setupWorker } from 'msw/browser';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';

export const worker = setupWorker(...profileHandlers, ...themesByGenreHandler);
