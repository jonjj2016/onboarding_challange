import type { Pool } from 'pg';
import type { ProductDto, ProductListQueryDto } from './dto';
import type { IProductRepository, PaginatedResult } from './product.interface';

export class ProductRepository implements IProductRepository {
  constructor(private readonly pool: Pool) {}

  async findMany(query: ProductListQueryDto): Promise<PaginatedResult<ProductDto>> {
    const { page, pageSize, search } = query;
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`name ILIKE $${params.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const { rows: countRows } = await this.pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM products ${where}`,
      params,
    );
    const total = Number(countRows[0].count);

    params.push(pageSize, (page - 1) * pageSize);
    const { rows } = await this.pool.query<ProductDto>(
      `SELECT * FROM products ${where} ORDER BY name ASC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    );

    return { data: rows, total };
  }

  async findById(id: string): Promise<ProductDto | null> {
    const { rows } = await this.pool.query<ProductDto>('SELECT * FROM products WHERE id = $1', [
      id,
    ]);
    return rows[0] ?? null;
  }

  async findByIds(ids: string[]): Promise<ProductDto[]> {
    const { rows } = await this.pool.query<ProductDto>(
      'SELECT * FROM products WHERE id = ANY($1::uuid[])',
      [ids],
    );
    return rows;
  }
}
