import type { ProductsByContentDto, UpdateContentProductsResultDto } from './dto';
import type {
  IContentProductRepository,
  IContentProductService,
} from './content-product.interface';

export class ContentProductService implements IContentProductService {
  constructor(private readonly repository: IContentProductRepository) {}

  async getProductsForContents(contentIds: string[]): Promise<ProductsByContentDto[]> {
    return this.repository.findByContentIds(contentIds);
  }

  async updateContentProducts(
    contentId: string,
    productIds: string[],
  ): Promise<UpdateContentProductsResultDto> {
    await this.repository.replaceForContent(contentId, productIds);
    return { content_id: contentId, product_ids: productIds };
  }
}
