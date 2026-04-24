export interface ContentListQueryDto {
  page: number;
  pageSize: number;
  search?: string;
  slug?: string;
  status?: number;
  authorId?: string;
  site?: string;
  sort?: string;
  idIn?: string[];
}

export interface CreateContentDto {
  title: string;
  slug: string;
  body: string;
  author_id: string;
  site: string;
}

export interface UpdateContentDto {
  title?: string;
  slug?: string;
  body?: string;
  status?: number;
  author_id?: string;
}

// snake_case — REST API contract
export interface ContentDto {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: number;
  author_id: string;
  site: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaginationMetaDto {
  total: number;
  page: number;
  page_size: number;
}
