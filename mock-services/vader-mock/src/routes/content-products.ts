import { Router } from 'express';
import { pool } from '../db';
import type { ApiResponse, Product, ProductsByContent } from '../types';

const router = Router();

// GET /v2/content-products?content_id:in=id1,id2,id3
//
// This is the DataLoader endpoint. One request returns all products for a
// batch of content IDs, ordered by position. Without this, fetching a list
// of 20 content items would require 20 separate product requests (N+1).
//
// Response shape:
// { data: [{ content_id, products: [...] }, ...], meta: {} }
router.get('/', async (req, res) => {
  const contentIdIn = req.query['content_id:in'] as string | undefined;

  if (!contentIdIn) {
    res.status(400).json({ error: 'content_id:in query parameter is required' });
    return;
  }

  const contentIds = contentIdIn.split(',').filter(Boolean);
  if (!contentIds.length) {
    const body: ApiResponse<ProductsByContent[]> = { data: [], meta: {} };
    res.json(body);
    return;
  }

  // Single query: join products to the junction, filter by content IDs, sort by position
  const { rows } = await pool.query<Product & { content_id: string; position: number }>(
    `SELECT p.*, cp.content_id, cp.position
     FROM contents_products cp
     JOIN products p ON p.id = cp.product_id
     WHERE cp.content_id = ANY($1::uuid[])
     ORDER BY cp.content_id, cp.position ASC`,
    [contentIds],
  );

  // Group rows by content_id, preserving the per-content position order
  const grouped = new Map<string, Product[]>();
  for (const contentId of contentIds) {
    grouped.set(contentId, []);
  }
  for (const row of rows) {
    const { content_id, position: _position, ...product } = row;
    grouped.get(content_id)?.push(product as Product);
  }

  const data: ProductsByContent[] = contentIds.map((id) => ({
    content_id: id,
    products: grouped.get(id) ?? [],
  }));

  const body: ApiResponse<ProductsByContent[]> = { data, meta: {} };
  res.json(body);
});

// PUT /v2/content-products/:contentId
//
// Replaces the full ordered product list for a content item.
// Body: { product_ids: ["uuid1", "uuid2", "uuid3"] }
// Position is derived from the array index (0-based stored as 1-based).
router.put('/:contentId', async (req, res) => {
  const { contentId } = req.params;
  const productIds = req.body?.product_ids as unknown;

  if (!Array.isArray(productIds)) {
    res.status(400).json({ error: 'product_ids must be an array' });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Delete existing links for this content
    await client.query('DELETE FROM contents_products WHERE content_id = $1', [contentId]);

    // Insert the new ordered set
    for (let i = 0; i < productIds.length; i++) {
      await client.query(
        'INSERT INTO contents_products (content_id, product_id, position) VALUES ($1, $2, $3)',
        [contentId, productIds[i], i + 1],
      );
    }

    await client.query('COMMIT');

    res.json({ data: { content_id: contentId, product_ids: productIds }, meta: {} });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

export default router;
