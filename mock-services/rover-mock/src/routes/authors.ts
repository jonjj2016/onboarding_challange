import { Router } from 'express';
import { pool } from '../db';
import type { ApiResponse, Author } from '../types';

const router = Router();

// GET /v2/authors
// Supports: ?page=1&page_size=10&search=alice&id:in=uuid1,uuid2
router.get('/', async (req, res) => {
  const page = Math.max(1, Number(req.query['page']) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query['page_size']) || 10));
  const search = (req.query['search'] as string | undefined)?.trim();
  const idIn = req.query['id:in'] as string | undefined;

  // Batch lookup — returns all matching authors by id, no pagination
  if (idIn) {
    const ids = idIn.split(',').filter(Boolean);
    const { rows } = await pool.query<Author>(
      'SELECT * FROM authors WHERE id = ANY($1::uuid[])',
      [ids],
    );
    const body: ApiResponse<Author[]> = { data: rows, meta: {} };
    res.json(body);
    return;
  }

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await pool.query<{ count: string }>(
    `SELECT COUNT(*) FROM authors ${where}`,
    params,
  );
  const total = Number(countResult.rows[0].count);

  params.push(pageSize, (page - 1) * pageSize);
  const { rows } = await pool.query<Author>(
    `SELECT * FROM authors ${where} ORDER BY name ASC LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );

  const body: ApiResponse<Author[]> = {
    data: rows,
    meta: { total, page, page_size: pageSize },
  };
  res.json(body);
});

// GET /v2/authors/:id
router.get('/:id', async (req, res) => {
  const { rows } = await pool.query<Author>('SELECT * FROM authors WHERE id = $1', [req.params['id']]);
  if (!rows[0]) {
    res.status(404).json({ error: 'Author not found' });
    return;
  }
  const body: ApiResponse<Author> = { data: rows[0], meta: {} };
  res.json(body);
});

export default router;
