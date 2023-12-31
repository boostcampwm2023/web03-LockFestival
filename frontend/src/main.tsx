import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import initMockAPI from '@__mocks__/index.ts';
import GlobalStyle from './styles/GlobalStyles.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';

async function deferRender() {
  if (!import.meta.env.DEV) {
    return;
  }

  await initMockAPI();
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 } },
});

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <HelmetProvider>
            <GlobalStyle />
            <App />
          </HelmetProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
});
