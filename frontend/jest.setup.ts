import '@testing-library/jest-dom';
import { server } from './src/__mocks__/server';
import { beforeAll, afterAll, afterEach } from '@jest/globals';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
