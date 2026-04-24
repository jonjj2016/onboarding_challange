import type { Request, Response } from 'express';
import type { IProductController, IProductService } from './product.interface';

export class ProductController implements IProductController {
  constructor(private readonly service: IProductService) {}

  async list(req: Request, res: Response): Promise<void> {
    const idIn = req.query['id:in'] as string | undefined;

    if (idIn) {
      const ids = idIn.split(',').filter(Boolean);
      const data = await this.service.getBatch(ids);
      res.json({ data, meta: {} });
      return;
    }

    const query = {
      page: Math.max(1, Number(req.query['page']) || 1),
      pageSize: Math.min(100, Math.max(1, Number(req.query['page_size']) || 10)),
      search: (req.query['search'] as string | undefined)?.trim(),
    };

    const { data, total } = await this.service.list(query);
    res.json({
      data,
      meta: { total, page: query.page, page_size: query.pageSize },
    });
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.service.getById(req.params['id']!);
      res.json({ data: product, meta: {} });
    } catch {
      res.status(404).json({ error: 'Product not found' });
    }
  }
}
