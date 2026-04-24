import type { Request, Response } from 'express';
import type { ProductsByContentDto, UpdateContentProductsResultDto } from './dto';

export interface IContentProductRepository {
  findByContentIds(contentIds: string[]): Promise<ProductsByContentDto[]>;
  replaceForContent(contentId: string, productIds: string[]): Promise<void>;
}

export interface IContentProductService {
  getProductsForContents(contentIds: string[]): Promise<ProductsByContentDto[]>;
  updateContentProducts(contentId: string, productIds: string[]): Promise<UpdateContentProductsResultDto>;
}

export interface IContentProductController {
  list(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
