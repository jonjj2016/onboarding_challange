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

export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: number;
  authorId: string;
  site: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageMeta {
  total: number;
  page: number;
  pageSize: number;
}

export class RoverDataSource extends RESTDataSource {
  override baseURL = process.env.ROVER_SERVICE_URL || 'http://localhost:4001';

  // Batches individual author fetches within a single request into one API call
  private authorLoader = new DataLoader<string, Author>(async (ids) => {
    const res = await this.get<Envelope<Author[]>>('/v1/authors', {
      params: { 'id:in': ids.join(',') },
    });
    const byId = new Map(
      res.data.map((a) => [a.id, convertKeysToCamel<Author>(a)]),
    );
    return ids.map((id) => byId.get(id) ?? new Error(`Author ${id} not found`));
  });

  async getContent(id: string): Promise<Content> {
    const res = await this.get<Envelope<Record<string, unknown>>>(`/v1/content/${id}`);
    return convertKeysToCamel<Content>(res.data);
  }

  async getContents(params: Record<string, string>): Promise<{ data: Content[]; meta: PageMeta }> {
    const res = await this.get<Envelope<Record<string, unknown>[]>>('/v1/content', { params });
    const meta = res.meta as RawMeta;
    return {
      data: res.data.map((c) => convertKeysToCamel<Content>(c)),
      meta: { total: meta.total, page: meta.page, pageSize: meta.page_size },
    };
  }

  async getAuthorById(id: string): Promise<Author> {
    return this.authorLoader.load(id);
  }

  async getAuthors(params: Record<string, string>): Promise<{ data: Author[]; meta: PageMeta }> {
    const res = await this.get<Envelope<Record<string, unknown>[]>>('/v1/authors', { params });
    const meta = res.meta as RawMeta;
    return {
      data: res.data.map((a) => convertKeysToCamel<Author>(a)),
      meta: { total: meta.total, page: meta.page, pageSize: meta.page_size },
    };
  }

  async isSlugAvailable(slug: string, site: string, excludeId?: string): Promise<boolean> {
    const res = await this.get<Envelope<Record<string, unknown>[]>>('/v1/content', {
      params: { slug, site, page_size: '1' },
    });
    const matches = res.data.map((c) => convertKeysToCamel<Content>(c));
    if (matches.length === 0) return true;
    // Allow if the only match is the content being edited
    if (matches.length === 1 && excludeId && matches[0].id === excludeId) return true;
    return false;
  }

  async createContent(input: Record<string, unknown>): Promise<Content> {
    const res = await this.post<Envelope<Record<string, unknown>>>('/v1/content', {
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' },
    });
    return convertKeysToCamel<Content>(res.data);
  }

  async updateContent(id: string, input: Record<string, unknown>): Promise<Content> {
    const res = await this.patch<Envelope<Record<string, unknown>>>(`/v1/content/${id}`, {
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' },
    });
    return convertKeysToCamel<Content>(res.data);
  }
}
