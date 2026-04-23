import app from './app';
import { connectWithRetry } from './db';
import { migrate } from './migrate';
import { seed } from './seed';

const PORT = Number(process.env.PORT) || 4002;

async function main() {
  await connectWithRetry();
  await migrate();
  await seed();

  app.listen(PORT, () => {
    console.log(`vader-mock listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
