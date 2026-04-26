import type { Pool } from 'pg';

import { ContentStatus } from '../../types';
import type { IContentRepository, PaginatedResult } from './content.interface';
import type { ContentDto, ContentListQueryDto, CreateContentDto, UpdateContentDto } from './dto';

export class ContentRepository implements IContentRepository {
  constructor(private readonly pool: Pool) {}

  async findMany(query: ContentListQueryDto): Promise<PaginatedResult<ContentDto>> {
    const { page, pageSize, search, slug, status, authorId, site, sort, idIn } = query;
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (search && idIn?.length) {
      params.push(`%${search}%`);
      const searchIdx = params.length;
      params.push(idIn);
      const idInIdx = params.length;
      conditions.push(
        `((title ILIKE $${searchIdx} OR body ILIKE $${searchIdx}) OR id = ANY($${idInIdx}::uuid[]))`,
      );
    } else if (search) {
      params.push(`%${search}%`);
      conditions.push(`(title ILIKE $${params.length} OR body ILIKE $${params.length})`);
    } else if (idIn?.length) {
      params.push(idIn);
      conditions.push(`id = ANY($${params.length}::uuid[])`);
    }
    if (slug) {
      params.push(slug);
      conditions.push(`slug = $${params.length}`);
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

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const orderBy =
      sort === 'title_asc'
        ? 'title ASC'
        : sort === 'title_desc'
          ? 'title DESC'
          : sort === 'updated_asc'
            ? 'updated_at ASC'
            : 'updated_at DESC';

    const { rows: countRows } = await this.pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM contents ${where}`,
      params,
    );
    const total = Number(countRows[0].count);

    params.push(pageSize, (page - 1) * pageSize);
    const { rows } = await this.pool.query<ContentDto>(
      `SELECT * FROM contents ${where} ORDER BY ${orderBy} LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    );

    return { data: rows, total };
  }

  async findById(id: string): Promise<ContentDto | null> {
    const { rows } = await this.pool.query<ContentDto>('SELECT * FROM contents WHERE id = $1', [
      id,
    ]);
    return rows[0] ?? null;
  }

  async findByIds(ids: string[]): Promise<ContentDto[]> {
    const { rows } = await this.pool.query<ContentDto>(
      'SELECT * FROM contents WHERE id = ANY($1::uuid[])',
      [ids],
    );
    return rows;
  }

  async create(data: CreateContentDto): Promise<ContentDto> {
    try {
      const { rows } = await this.pool.query<ContentDto>(
        `INSERT INTO contents (title, slug, body, status, author_id, site)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [data.title, data.slug, data.body, ContentStatus.Draft, data.author_id, data.site],
      );
      return rows[0];
    } catch (err) {
      if (err instanceof Error && err.message.includes('unique')) {
        throw new Error('SLUG_CONFLICT');
      }
      throw err;
    }
  }

  async update(id: string, data: UpdateContentDto): Promise<ContentDto | null> {
    const allowed = ['title', 'slug', 'body', 'status', 'author_id'] as const;
    const updates: string[] = [];
    const params: unknown[] = [];

    for (const field of allowed) {
      if (data[field] !== undefined) {
        params.push(data[field]);
        updates.push(`${field} = $${params.length}`);
      }
    }

    if (!updates.length) return this.findById(id);

    updates.push('updated_at = NOW()');
    params.push(id);

    try {
      const { rows } = await this.pool.query<ContentDto>(
        `UPDATE contents SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING *`,
        params,
      );
      return rows[0] ?? null;
    } catch (err) {
      if (err instanceof Error && err.message.includes('unique')) {
        throw new Error('SLUG_CONFLICT');
      }
      throw err;
    }
  }
}
