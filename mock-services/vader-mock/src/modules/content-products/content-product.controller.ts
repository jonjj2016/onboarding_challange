import type { Request, Response } from 'express';
import type { IContentProductController, IContentProductService } from './content-product.interface';

export class ContentProductController implements IContentProductController {
  constructor(private readonly service: IContentProductService) {}

  async list(req: Request, res: Response): Promise<void> {
    const contentIdIn = req.query['content_id:in'] as string | undefined;

    if (!contentIdIn) {
      res.status(400).json({ error: 'content_id:in query parameter is required' });
      return;
    }

    const contentIds = contentIdIn.split(',').filter(Boolean);
    if (!contentIds.length) {
      res.json({ data: [], meta: {} });
      return;
    }

    const data = await this.service.getProductsForContents(contentIds);
    res.json({ data, meta: {} });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { contentId } = req.params;
    const productIds = req.body?.product_ids as unknown;

    if (!Array.isArray(productIds)) {
      res.status(400).json({ error: 'product_ids must be an array' });
      return;
    }

    const result = await this.service.updateContentProducts(contentId!, productIds as string[]);
    res.json({ data: result, meta: {} });
  }
}
