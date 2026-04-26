import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options: Record<string, unknown>) => ({
    ...options,
    presets: [
      ['@babel/preset-env', { targets: { browsers: ['> 1%', 'last 2 versions'] } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  }),
};

export default config;
