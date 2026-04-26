import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import express from 'express';
import { VaderDataSource } from './VaderDataSource';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export async function startVaderSubgraph(port: number): Promise<void> {
  // oxlint-disable-next-line typescript/no-explicit-any
  const schema = buildSubgraphSchema({ typeDefs, resolvers: resolvers as any });
  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  app.use(express.json());
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async () => ({
        dataSources: { vader: new VaderDataSource() },
      }),
    }),
  );

  await new Promise<void>((resolve) => app.listen(port, resolve));
  console.log(`vader subgraph on :${port}`);
}
