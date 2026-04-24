import type { Request, Response } from 'express';
import type { AuthorDto, AuthorListQueryDto } from './dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface IAuthorRepository {
  findMany(query: AuthorListQueryDto): Promise<PaginatedResult<AuthorDto>>;
  findById(id: string): Promise<AuthorDto | null>;
  findByIds(ids: string[]): Promise<AuthorDto[]>;
}

export interface IAuthorService {
  list(query: AuthorListQueryDto): Promise<PaginatedResult<AuthorDto>>;
  getById(id: string): Promise<AuthorDto>;
  getBatch(ids: string[]): Promise<AuthorDto[]>;
}

export interface IAuthorController {
  list(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
}
