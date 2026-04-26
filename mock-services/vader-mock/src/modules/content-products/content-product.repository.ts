import type { Pool } from 'pg';

import type { ProductDto } from '../products/dto';
import type { IContentProductRepository } from './content-product.interface';
import type { ProductsByContentDto } from './dto';

export class ContentProductRepository implements IContentProductRepository {
  constructor(private readonly pool: Pool) {}

  async findContentIdsByProductSearch(search: string): Promise<string[]> {
    const { rows } = await this.pool.query<{ content_id: string }>(
      `SELECT DISTINCT cp.content_id
       FROM contents_products cp
       JOIN products p ON p.id = cp.product_id
       WHERE p.name ILIKE $1`,
      [`%${search}%`],
    );
    return rows.map((r) => r.content_id);
  }

  async findByContentIds(contentIds: string[]): Promise<ProductsByContentDto[]> {
    const { rows } = await this.pool.query<ProductDto & { content_id: string; position: number }>(
      `SELECT p.*, cp.content_id, cp.position
       FROM contents_products cp
       JOIN products p ON p.id = cp.product_id
       WHERE cp.content_id = ANY($1::uuid[])
       ORDER BY cp.content_id, cp.position ASC`,
      [contentIds],
    );

    const grouped = new Map<string, ProductDto[]>(contentIds.map((id) => [id, []]));

    for (const { content_id, position: _position, ...product } of rows) {
      grouped.get(content_id)?.push(product as ProductDto);
    }

    return contentIds.map((id) => ({
      content_id: id,
      products: grouped.get(id) ?? [],
    }));
  }

  async replaceForContent(contentId: string, productIds: string[]): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM contents_products WHERE content_id = $1', [contentId]);

      for (let i = 0; i < productIds.length; i++) {
        await client.query(
          'INSERT INTO contents_products (content_id, product_id, position) VALUES ($1, $2, $3)',
          [contentId, productIds[i], i + 1],
        );
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}
