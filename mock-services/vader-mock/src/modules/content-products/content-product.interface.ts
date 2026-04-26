import type { Request, Response } from 'express';

import type { ProductsByContentDto, UpdateContentProductsResultDto } from './dto';

export interface IContentProductRepository {
  findByContentIds(contentIds: string[]): Promise<ProductsByContentDto[]>;
  findContentIdsByProductSearch(search: string): Promise<string[]>;
  replaceForContent(contentId: string, productIds: string[]): Promise<void>;
}

export interface IContentProductService {
  getProductsForContents(contentIds: string[]): Promise<ProductsByContentDto[]>;
  getContentIdsByProductSearch(search: string): Promise<string[]>;
  updateContentProducts(
    contentId: string,
    productIds: string[],
  ): Promise<UpdateContentProductsResultDto>;
}

export interface IContentProductController {
  list(req: Request, res: Response): Promise<void>;
  searchContentIds(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
