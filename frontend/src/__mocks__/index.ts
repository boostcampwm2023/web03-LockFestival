const initMockAPI = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    const { server } = await import('@__mocks__/server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('@__mocks__/browser');
    worker.start();
  }
};

export default initMockAPI;
