export interface AuthorListQueryDto {
  page: number;
  pageSize: number;
  search?: string;
  idIn?: string[];
}

// snake_case — REST API contract, must stay consistent with DB column names
export interface AuthorDto {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaginationMetaDto {
  total: number;
  page: number;
  page_size: number;
}
