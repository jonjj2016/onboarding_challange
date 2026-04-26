import type {
  IContentProductRepository,
  IContentProductService,
} from './content-product.interface';
import type { ProductsByContentDto, UpdateContentProductsResultDto } from './dto';

export class ContentProductService implements IContentProductService {
  constructor(private readonly repository: IContentProductRepository) {}

  async getProductsForContents(contentIds: string[]): Promise<ProductsByContentDto[]> {
    return this.repository.findByContentIds(contentIds);
  }

  async getContentIdsByProductSearch(search: string): Promise<string[]> {
    return this.repository.findContentIdsByProductSearch(search);
  }

  async updateContentProducts(
    contentId: string,
    productIds: string[],
  ): Promise<UpdateContentProductsResultDto> {
    await this.repository.replaceForContent(contentId, productIds);
    return { content_id: contentId, product_ids: productIds };
  }
}
