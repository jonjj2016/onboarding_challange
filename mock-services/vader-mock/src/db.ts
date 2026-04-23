import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'vader_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

export async function connectWithRetry(maxAttempts = 10, delayMs = 2000): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to PostgreSQL');
      return;
    } catch {
      console.log(`DB not ready (attempt ${attempt}/${maxAttempts}), retrying in ${delayMs}ms…`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('Could not connect to PostgreSQL after max attempts');
}
