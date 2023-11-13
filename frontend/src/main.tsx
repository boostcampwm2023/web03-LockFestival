import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import initMockAPI from '@__mocks__/index.ts';
import GlobalStyle from './styles/GlobalStyles.tsx';

async function deferRender() {
  if (!import.meta.env.DEV) {
    return;
  }

  await initMockAPI();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  );
});
