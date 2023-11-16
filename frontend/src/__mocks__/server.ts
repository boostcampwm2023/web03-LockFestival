import { setupServer } from 'msw/node';
import profileHandlers from './handlers/profileHandlers';

export const server = setupServer(...profileHandlers);
