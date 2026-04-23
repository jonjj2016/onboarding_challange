import { pool } from './db';

export async function migrate(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS authors (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(255) NOT NULL,
      email       VARCHAR(255) NOT NULL UNIQUE,
      created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contents (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title       VARCHAR(255) NOT NULL,
      slug        VARCHAR(255) NOT NULL,
      body        TEXT         NOT NULL,
      status      INTEGER      NOT NULL DEFAULT 1,
      author_id   UUID         NOT NULL REFERENCES authors(id),
      site        VARCHAR(255) NOT NULL,
      created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(slug, site)
    );
  `);

  console.log('Migrations complete');
}
