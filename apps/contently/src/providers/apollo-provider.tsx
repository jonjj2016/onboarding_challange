import type { ReactNode } from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';

import { apolloClient } from 'lib/apollo-client';

interface Props {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: Props) => (
  <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
);
