import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', '@emotion/babel-plugin'],
      },
    }),
    EnvironmentPlugin(['DEV']),
    tsconfigPaths(),
  ],
});
