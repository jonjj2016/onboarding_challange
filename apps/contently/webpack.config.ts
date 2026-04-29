import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const config: Configuration & { devServer?: DevServerConfiguration } = {
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // Mirror tsconfig paths so absolute imports work at runtime
    alias: {
      lib: path.resolve(__dirname, 'src/lib'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      modules: path.resolve(__dirname, 'src/modules'),
      components: path.resolve(__dirname, 'src/components'),
      queries: path.resolve(__dirname, 'src/queries'),
      utils: path.resolve(__dirname, 'src/utils'),
      stores: path.resolve(__dirname, 'src/stores'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      pages: path.resolve(__dirname, 'src/pages'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      providers: path.resolve(__dirname, 'src/providers'),
      data: path.resolve(__dirname, 'src/data'),
      '@contently/toolkit': path.resolve(__dirname, '../../packages/toolkit/src/index.ts'),
      '@contently/types': path.resolve(__dirname, '../../shared/src/index.ts'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true, // lets React Router handle all routes
    proxy: [
      {
        context: ['/graphql', '/api'],
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    ],
  },
};

export default config;
