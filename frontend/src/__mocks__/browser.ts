import { setupWorker } from 'msw/browser';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';
import recruitmentCardHandler from './handlers/recruitmentCardHandler';
import themeDetailsHandler from './handlers/themeDetailsHandlers';
import loginHandlers from './handlers/loginHandlers';

export const worker = setupWorker(
  ...profileHandlers,
  ...themesByGenreHandler,
  ...loginHandlers,
  ...recruitmentCardHandler,
  ...themeDetailsHandler
);
