import { pool } from './db';

export async function migrate(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(255)   NOT NULL,
      price       NUMERIC(10, 2) NOT NULL,
      image_url   TEXT           NOT NULL DEFAULT '',
      created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contents_products (
      content_id  UUID    NOT NULL,
      product_id  UUID    NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      position    INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (content_id, product_id)
    );

    CREATE INDEX IF NOT EXISTS idx_contents_products_content_id
      ON contents_products(content_id);
  `);

  console.log('Migrations complete');
}
