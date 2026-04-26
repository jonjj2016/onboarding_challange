/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Path aliases — mirror tsconfig paths
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^stores/(.*)$': '<rootDir>/src/stores/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^providers$': '<rootDir>/src/providers/index.tsx',
    '^providers/(.*)$': '<rootDir>/src/providers/$1',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/style-mock.js',
  },
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
};
