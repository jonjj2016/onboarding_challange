import type { Request, Response } from 'express';
import type { IAuthorController, IAuthorService } from './author.interface';

export class AuthorController implements IAuthorController {
  constructor(private readonly service: IAuthorService) {}

  async list(req: Request, res: Response): Promise<void> {
    const idIn = req.query['id:in'] as string | undefined;

    // Batch lookup — bypass pagination and return all matching authors
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
      const author = await this.service.getById(req.params['id']!);
      res.json({ data: author, meta: {} });
    } catch {
      res.status(404).json({ error: 'Author not found' });
    }
  }
}
