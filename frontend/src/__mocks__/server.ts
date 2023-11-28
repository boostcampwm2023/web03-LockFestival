import { setupServer } from 'msw/node';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';
import loginHandlers from './handlers/loginHandlers';
import recruitmentCardHandler from './handlers/recruitmentCardHandler';
import themeDetailsHandler from './handlers/themeDetailsHandlers';

export const server = setupServer(
  ...profileHandlers,
  ...themesByGenreHandler,
  ...loginHandlers,
  ...recruitmentCardHandler,
  ...themeDetailsHandler
);
