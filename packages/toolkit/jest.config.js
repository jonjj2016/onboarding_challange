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
};
