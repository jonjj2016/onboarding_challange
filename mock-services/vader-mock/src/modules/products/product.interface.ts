import type { Request, Response } from 'express';
import type { ProductDto, ProductListQueryDto } from './dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface IProductRepository {
  findMany(query: ProductListQueryDto): Promise<PaginatedResult<ProductDto>>;
  findById(id: string): Promise<ProductDto | null>;
  findByIds(ids: string[]): Promise<ProductDto[]>;
}

export interface IProductService {
  list(query: ProductListQueryDto): Promise<PaginatedResult<ProductDto>>;
  getById(id: string): Promise<ProductDto>;
  getBatch(ids: string[]): Promise<ProductDto[]>;
}

export interface IProductController {
  list(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
}
