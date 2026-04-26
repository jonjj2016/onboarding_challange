import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

import { startRoverSubgraph } from './graphql/rover';
import { startVaderSubgraph } from './graphql/vader';
import { authRouter, extractToken } from './modules/auth';

async function main() {
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
  app.use(cookieParser());
  app.use(extractToken);

  app.use('/api', authRouter);

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: true, credentials: true }),
    express.json(),
    expressMiddleware(server),
  );

  // Serve the built React app — only present in Docker (multi-stage build)
  const publicDir = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDir));

  // SPA fallback: any non-API route returns index.html so React Router handles it
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Gateway ready at http://localhost:${PORT}/graphql`);
  });
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
