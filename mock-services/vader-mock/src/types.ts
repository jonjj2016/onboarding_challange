export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ContentProduct {
  content_id: string;
  product_id: string;
  position: number;
}

// What the DataLoader endpoint returns: products grouped by content_id
export interface ProductsByContent {
  content_id: string;
  products: Product[];
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
