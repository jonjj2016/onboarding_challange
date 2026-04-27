import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis client error:', err));

// Connect once on startup. Failure is logged but does not crash the server —
// lock endpoints will return 503 if Redis is unavailable.
redisClient.connect().catch((err) => {
  console.error('Redis connect failed — content locking unavailable:', err);
});

export default redisClient;
