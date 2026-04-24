import type { ProductDto } from '../products/dto';

export interface ProductsByContentDto {
  content_id: string;
  products: ProductDto[];
}

export interface UpdateContentProductsDto {
  productIds: string[];
}

export interface UpdateContentProductsResultDto {
  content_id: string;
  product_ids: string[];
}
