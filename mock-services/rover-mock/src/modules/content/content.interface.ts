import type { Request, Response } from 'express';
import type { ContentDto, ContentListQueryDto, CreateContentDto, UpdateContentDto } from './dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface IContentRepository {
  findMany(query: ContentListQueryDto): Promise<PaginatedResult<ContentDto>>;
  findById(id: string): Promise<ContentDto | null>;
  findByIds(ids: string[]): Promise<ContentDto[]>;
  create(data: CreateContentDto): Promise<ContentDto>;
  update(id: string, data: UpdateContentDto): Promise<ContentDto | null>;
}

export interface IContentService {
  list(query: ContentListQueryDto): Promise<PaginatedResult<ContentDto>>;
  getById(id: string): Promise<ContentDto>;
  getBatch(ids: string[]): Promise<ContentDto[]>;
  create(data: CreateContentDto): Promise<ContentDto>;
  update(id: string, data: UpdateContentDto): Promise<ContentDto>;
}

export interface IContentController {
  list(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
