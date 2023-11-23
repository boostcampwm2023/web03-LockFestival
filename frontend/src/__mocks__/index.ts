const initMockAPI = async (): Promise<void> => {
  const { worker } = await import('@__mocks__/browser');
  worker.start();
};

export default initMockAPI;
