export enum ContentStatus {
  Draft = 1,
  Scheduled = 2,
  Published = 3,
  Deleted = 4,
  Unpublished = 5,
}

export interface Author {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: ContentStatus;
  author_id: string;
  site: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaginationMeta {
  total: number;
  page: number;
  page_size: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: PaginationMeta | Record<string, never>;
}
