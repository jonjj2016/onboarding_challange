import { Router } from 'express';
import { pool } from '../db';
import type { ApiResponse, Product } from '../types';

const router = Router();

// GET /v2/products
// Supports: ?page, page_size, search, id:in
router.get('/', async (req, res) => {
  const page = Math.max(1, Number(req.query['page']) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query['page_size']) || 10));
  const search = (req.query['search'] as string | undefined)?.trim();
  const idIn = req.query['id:in'] as string | undefined;

  if (idIn) {
    const ids = idIn.split(',').filter(Boolean);
    const { rows } = await pool.query<Product>(
      'SELECT * FROM products WHERE id = ANY($1::uuid[])',
      [ids],
    );
    const body: ApiResponse<Product[]> = { data: rows, meta: {} };
    res.json(body);
    return;
  }

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`name ILIKE $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await pool.query<{ count: string }>(
    `SELECT COUNT(*) FROM products ${where}`,
    params,
  );
  const total = Number(countResult.rows[0].count);

  params.push(pageSize, (page - 1) * pageSize);
  const { rows } = await pool.query<Product>(
    `SELECT * FROM products ${where} ORDER BY name ASC LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );

  const body: ApiResponse<Product[]> = {
    data: rows,
    meta: { total, page, page_size: pageSize },
  };
  res.json(body);
});

// GET /v2/products/:id
router.get('/:id', async (req, res) => {
  const { rows } = await pool.query<Product>('SELECT * FROM products WHERE id = $1', [
    req.params['id'],
  ]);
  if (!rows[0]) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  const body: ApiResponse<Product> = { data: rows[0], meta: {} };
  res.json(body);
});

export default router;
