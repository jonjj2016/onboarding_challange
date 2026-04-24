import type { ProductDto, ProductListQueryDto } from './dto';
import type { IProductRepository, IProductService, PaginatedResult } from './product.interface';

export class ProductService implements IProductService {
  constructor(private readonly repository: IProductRepository) {}

  async list(query: ProductListQueryDto): Promise<PaginatedResult<ProductDto>> {
    return this.repository.findMany(query);
  }

  async getById(id: string): Promise<ProductDto> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async getBatch(ids: string[]): Promise<ProductDto[]> {
    return this.repository.findByIds(ids);
  }
}
