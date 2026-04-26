import { RESTDataSource } from '@apollo/datasource-rest';
import DataLoader from 'dataloader';

import { convertKeysToCamel } from '../../utils/caseConvert';

interface RawMeta {
  total: number;
  page: number;
  page_size: number;
}

interface Envelope<T> {
  data: T;
  meta: RawMeta | Record<string, never>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface RawProductsByContent {
  content_id: string;
  products: Record<string, unknown>[];
}

export interface PageMeta {
  total: number;
  page: number;
  pageSize: number;
}

export class VaderDataSource extends RESTDataSource {
  override baseURL = process.env.VADER_SERVICE_URL || 'http://localhost:4002';

  // Batches all content→products lookups within a single gateway request.
  // The gateway sends one _entities query to vader with all content IDs;
  // __resolveReference fires once per entity — DataLoader coalesces them.
  private contentProductsLoader = new DataLoader<string, Product[]>(async (contentIds) => {
    const res = await this.get<Envelope<RawProductsByContent[]>>('/v2/content-products', {
      params: { 'content_id:in': contentIds.join(',') },
    });

    const byContentId = new Map<string, Product[]>(
      res.data.map((group) => [
        group.content_id,
        group.products.map((p) => convertKeysToCamel<Product>(p)),
      ]),
    );

    // DataLoader requires results in the same order as the input keys
    return contentIds.map((id) => byContentId.get(id) ?? []);
  });

  async getProductsForContent(contentId: string): Promise<Product[]> {
    return this.contentProductsLoader.load(contentId);
  }

  async getProduct(id: string): Promise<Product> {
    const res = await this.get<Envelope<Record<string, unknown>>>(`/v2/products/${id}`);
    return convertKeysToCamel<Product>(res.data);
  }

  async getContentIdsByProductSearch(search: string): Promise<string[]> {
    const res = await this.get<{ data: string[] }>('/v2/content-products/search-content-ids', {
      params: { search },
    });
    return res.data;
  }

  async getProducts(params: Record<string, string>): Promise<{ data: Product[]; meta: PageMeta }> {
    const res = await this.get<Envelope<Record<string, unknown>[]>>('/v2/products', { params });
    const meta = res.meta as RawMeta;
    return {
      data: res.data.map((p) => convertKeysToCamel<Product>(p)),
      meta: { total: meta.total, page: meta.page, pageSize: meta.page_size },
    };
  }

  async updateContentProducts(
    contentId: string,
    productIds: string[],
  ): Promise<{ contentId: string; productIds: string[] }> {
    await this.put(`/v2/content-products/${contentId}`, {
      body: JSON.stringify({ product_ids: productIds }),
      headers: { 'Content-Type': 'application/json' },
    });
    return { contentId, productIds };
  }
}
