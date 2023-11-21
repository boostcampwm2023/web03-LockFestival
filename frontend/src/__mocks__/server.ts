import { setupServer } from 'msw/node';
import profileHandlers from './handlers/profileHandlers';
import themesByGenreHandler from './handlers/themesByRandomHandler';

export const server = setupServer(...profileHandlers, ...themesByGenreHandler);
