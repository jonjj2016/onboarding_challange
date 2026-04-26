import type { Request, Response } from 'express';

import type { IContentController, IContentService } from './content.interface';
import type { CreateContentDto, UpdateContentDto } from './dto';

export class ContentController implements IContentController {
  constructor(private readonly service: IContentService) {}

  async list(req: Request, res: Response): Promise<void> {
    const idIn = req.query['id:in'] as string | undefined;

    if (idIn) {
      const ids = idIn.split(',').filter(Boolean);
      const data = await this.service.getBatch(ids);
      res.json({ data, meta: {} });
      return;
    }

    const contentIdsParam = req.query['content_ids'] as string | undefined;
    const query = {
      page: Math.max(1, Number(req.query['page']) || 1),
      pageSize: Math.min(100, Math.max(1, Number(req.query['page_size']) || 10)),
      search: (req.query['search'] as string | undefined)?.trim(),
      slug: req.query['slug'] as string | undefined,
      status: req.query['status'] ? Number(req.query['status']) : undefined,
      authorId: req.query['author_id'] as string | undefined,
      site: req.query['site'] as string | undefined,
      sort: (req.query['sort'] as string | undefined) || 'updated_desc',
      idIn: contentIdsParam ? contentIdsParam.split(',').filter(Boolean) : undefined,
    };

    const { data, total } = await this.service.list(query);
    res.json({
      data,
      meta: { total, page: query.page, page_size: query.pageSize },
    });
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const content = await this.service.getById(req.params['id']!);
      res.json({ data: content, meta: {} });
    } catch {
      res.status(404).json({ error: 'Content not found' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const body = req.body as Partial<CreateContentDto>;
    const { title, slug, body: bodyText, author_id, site } = body;

    if (!title || !slug || !bodyText || !author_id || !site) {
      res.status(400).json({ error: 'title, slug, body, author_id, and site are required' });
      return;
    }

    try {
      const content = await this.service.create({ title, slug, body: bodyText, author_id, site });
      res.status(201).json({ data: content, meta: {} });
    } catch (err) {
      if (err instanceof Error && err.message === 'SLUG_CONFLICT') {
        res.status(409).json({ error: 'Slug already exists for this site' });
        return;
      }
      throw err;
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const allowed: (keyof UpdateContentDto)[] = ['title', 'slug', 'body', 'status', 'author_id'];
    const data: UpdateContentDto = {};

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        (data as Record<string, unknown>)[field] = req.body[field];
      }
    }

    try {
      const content = await this.service.update(req.params['id']!, data);
      res.json({ data: content, meta: {} });
    } catch (err) {
      if (err instanceof Error && err.message === 'Content not found') {
        res.status(404).json({ error: 'Content not found' });
        return;
      }
      if (err instanceof Error && err.message === 'SLUG_CONFLICT') {
        res.status(409).json({ error: 'Slug already exists for this site' });
        return;
      }
      throw err;
    }
  }
}
