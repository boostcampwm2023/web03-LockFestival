import { setupWorker } from 'msw/browser';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';
import themeDetailsHandler from './handlers/themeDetailsHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...themesByGenreHandler,
  ...themeDetailsHandler
);
