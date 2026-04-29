import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import type { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper/resolverMap';
import express from 'express';

import { resolvers } from './resolvers';
import { RoverDataSource } from './RoverDataSource';
import { typeDefs } from './typeDefs';

export async function startRoverSubgraph(port: number): Promise<void> {
  const schema = buildSubgraphSchema({
    typeDefs,
    resolvers: resolvers as unknown as GraphQLResolverMap<unknown>,
  });
  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  app.use(express.json());
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async () => ({
        dataSources: { rover: new RoverDataSource() },
      }),
    }),
  );

  await new Promise<void>((resolve) => app.listen(port, resolve));
  console.log(`rover subgraph on :${port}`);
}
