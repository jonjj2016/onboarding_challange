/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
};
