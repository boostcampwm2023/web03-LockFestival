import { setupWorker } from 'msw/browser';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';
import recruitmentCardHandler from './handlers/recruitmentCardHandler';

export const worker = setupWorker(
  ...profileHandlers,
  ...themesByGenreHandler,
  ...recruitmentCardHandler
);
