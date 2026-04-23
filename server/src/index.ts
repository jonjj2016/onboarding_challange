import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { authRouter } from './auth';
import { startRoverSubgraph } from './graphql/rover';
import { startVaderSubgraph } from './graphql/vader';

async function main() {
  // Subgraphs run on internal ports within the same process
  await startRoverSubgraph(4010);
  await startVaderSubgraph(4011);

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'rover', url: 'http://localhost:4010/graphql' },
        { name: 'vader', url: 'http://localhost:4011/graphql' },
      ],
    }),
  });

  const server = new ApolloServer({ gateway });
  await server.start();

  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: false },
    }),
  );

  app.use('/api', authRouter);

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: true, credentials: true }),
    express.json(),
    expressMiddleware(server),
  );

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Gateway ready at http://localhost:${PORT}/graphql`);
  });
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
