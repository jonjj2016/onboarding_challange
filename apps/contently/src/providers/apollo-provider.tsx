import type { ReactNode } from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';

import { apolloClient } from 'lib/apollo-client';

interface Props {
  children: ReactNode;
}

export function ApolloProvider({ children }: Props) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
