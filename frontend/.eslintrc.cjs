module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
  },

  plugins: ['@typescript-eslint', 'prettier', 'react-refresh', 'react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'curly': ['error', 'all'],
    'no-console': 'warn',
    'no-magic-numbers': [
      'warn',
      { ignore: [1, 2, 3, 4], ignoreArrayIndexes: true, ignoreDefaultValues: true },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'vite.config.ts',
    'jest.config.ts',
    'jest.setup.ts',
    'public/',
    'tailwind.config.ts',
  ],
};
