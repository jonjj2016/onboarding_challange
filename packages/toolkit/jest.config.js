/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/style-mock.js',
  },
  // MUI + userEvent async interactions deadlock when workers share the jsdom event loop
  maxWorkers: 1,
};
