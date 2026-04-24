import type { Pool } from 'pg';
import type { AuthorDto, AuthorListQueryDto } from './dto';
import type { IAuthorRepository, PaginatedResult } from './author.interface';

export class AuthorRepository implements IAuthorRepository {
  constructor(private readonly pool: Pool) {}

  async findMany(query: AuthorListQueryDto): Promise<PaginatedResult<AuthorDto>> {
    const { page, pageSize, search } = query;
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const { rows: countRows } = await this.pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM authors ${where}`,
      params,
    );
    const total = Number(countRows[0].count);

    params.push(pageSize, (page - 1) * pageSize);
    const { rows } = await this.pool.query<AuthorDto>(
      `SELECT * FROM authors ${where} ORDER BY name ASC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    );

    return { data: rows, total };
  }

  async findById(id: string): Promise<AuthorDto | null> {
    const { rows } = await this.pool.query<AuthorDto>('SELECT * FROM authors WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByIds(ids: string[]): Promise<AuthorDto[]> {
    const { rows } = await this.pool.query<AuthorDto>(
      'SELECT * FROM authors WHERE id = ANY($1::uuid[])',
      [ids],
    );
    return rows;
  }
}
