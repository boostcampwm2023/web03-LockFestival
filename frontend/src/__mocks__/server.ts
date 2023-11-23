import { setupServer } from 'msw/node';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';
import loginHandlers from './handlers/loginHandlers';

export const server = setupServer(...profileHandlers, ...themesByGenreHandler, ...loginHandlers);
