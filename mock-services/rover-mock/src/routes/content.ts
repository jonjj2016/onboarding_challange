import { Router } from 'express';
import { pool } from '../db';
import { ContentStatus } from '../types';
import type { ApiResponse, Content } from '../types';

const router = Router();

// GET /v2/content
// Supports: ?page, page_size, search, status, author_id, site, sort, id:in
router.get('/', async (req, res) => {
  const page = Math.max(1, Number(req.query['page']) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query['page_size']) || 10));
  const search = (req.query['search'] as string | undefined)?.trim();
  const slug = req.query['slug'] as string | undefined;
  const status = req.query['status'] ? Number(req.query['status']) : undefined;
  const authorId = req.query['author_id'] as string | undefined;
  const site = req.query['site'] as string | undefined;
  const sort = (req.query['sort'] as string | undefined) || 'updated_desc';
  const idIn = req.query['id:in'] as string | undefined;

  // Batch lookup by ids — skips pagination
  if (idIn) {
    const ids = idIn.split(',').filter(Boolean);
    const { rows } = await pool.query<Content>(
      'SELECT * FROM contents WHERE id = ANY($1::uuid[])',
      [ids],
    );
    const body: ApiResponse<Content[]> = { data: rows, meta: {} };
    res.json(body);
    return;
  }

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(title ILIKE $${params.length} OR body ILIKE $${params.length})`);
  }
  if (status !== undefined) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }
  if (authorId) {
    params.push(authorId);
    conditions.push(`author_id = $${params.length}`);
  }
  if (site) {
    params.push(site);
    conditions.push(`site = $${params.length}`);
  }
  if (slug) {
    params.push(slug);
    conditions.push(`slug = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const orderBy =
    sort === 'title_asc'
      ? 'title ASC'
      : sort === 'title_desc'
        ? 'title DESC'
        : sort === 'updated_asc'
          ? 'updated_at ASC'
          : 'updated_at DESC';

  const countResult = await pool.query<{ count: string }>(
    `SELECT COUNT(*) FROM contents ${where}`,
    params,
  );
  const total = Number(countResult.rows[0].count);

  params.push(pageSize, (page - 1) * pageSize);
  const { rows } = await pool.query<Content>(
    `SELECT * FROM contents ${where} ORDER BY ${orderBy} LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );

  const body: ApiResponse<Content[]> = {
    data: rows,
    meta: { total, page, page_size: pageSize },
  };
  res.json(body);
});

// GET /v2/content/:id
router.get('/:id', async (req, res) => {
  const { rows } = await pool.query<Content>('SELECT * FROM contents WHERE id = $1', [
    req.params['id'],
  ]);
  if (!rows[0]) {
    res.status(404).json({ error: 'Content not found' });
    return;
  }
  const body: ApiResponse<Content> = { data: rows[0], meta: {} };
  res.json(body);
});

// POST /v2/content — creates a new content record, always starts as Draft
router.post('/', async (req, res) => {
  const { title, slug, body: bodyText, author_id, site } = req.body as Partial<Content>;

  if (!title || !slug || !bodyText || !author_id || !site) {
    res.status(400).json({ error: 'title, slug, body, author_id, and site are required' });
    return;
  }

  try {
    const { rows } = await pool.query<Content>(
      `INSERT INTO contents (title, slug, body, status, author_id, site)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, slug, bodyText, ContentStatus.Draft, author_id, site],
    );
    const response: ApiResponse<Content> = { data: rows[0], meta: {} };
    res.status(201).json(response);
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('unique')) {
      res.status(409).json({ error: 'Slug already exists for this site' });
      return;
    }
    throw err;
  }
});

// PATCH /v2/content/:id — partial update
router.patch('/:id', async (req, res) => {
  const allowed = ['title', 'slug', 'body', 'status', 'author_id'] as const;
  const updates: string[] = [];
  const params: unknown[] = [];

  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      params.push(req.body[field]);
      updates.push(`${field} = $${params.length}`);
    }
  }

  if (!updates.length) {
    res.status(400).json({ error: 'No valid fields to update' });
    return;
  }

  // Always bump updated_at
  updates.push(`updated_at = NOW()`);
  params.push(req.params['id']);

  try {
    const { rows } = await pool.query<Content>(
      `UPDATE contents SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING *`,
      params,
    );
    if (!rows[0]) {
      res.status(404).json({ error: 'Content not found' });
      return;
    }
    const response: ApiResponse<Content> = { data: rows[0], meta: {} };
    res.json(response);
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('unique')) {
      res.status(409).json({ error: 'Slug already exists for this site' });
      return;
    }
    throw err;
  }
});

export default router;
