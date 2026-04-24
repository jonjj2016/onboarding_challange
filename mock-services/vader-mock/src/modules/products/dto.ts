export interface ProductListQueryDto {
  page: number;
  pageSize: number;
  search?: string;
  idIn?: string[];
}

export interface ProductDto {
  id: string;
  name: string;
  price: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaginationMetaDto {
  total: number;
  page: number;
  page_size: number;
}
