import type { ReactNode } from 'react';

import { ApolloProvider } from './apollo-provider';
import { AuthProvider } from './auth-provider';
import { ThemeProvider } from './theme-provider';

interface Props {
  children: ReactNode;
}

export const RootProvider = ({ children }: Props) => (
  <ApolloProvider>
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export { AppRouter } from './router-provider';
