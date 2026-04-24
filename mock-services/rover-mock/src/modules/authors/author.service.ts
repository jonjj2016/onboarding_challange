import type { AuthorDto, AuthorListQueryDto } from './dto';
import type { IAuthorRepository, IAuthorService, PaginatedResult } from './author.interface';

export class AuthorService implements IAuthorService {
  constructor(private readonly repository: IAuthorRepository) {}

  async list(query: AuthorListQueryDto): Promise<PaginatedResult<AuthorDto>> {
    return this.repository.findMany(query);
  }

  async getById(id: string): Promise<AuthorDto> {
    const author = await this.repository.findById(id);
    if (!author) throw new Error('Author not found');
    return author;
  }

  async getBatch(ids: string[]): Promise<AuthorDto[]> {
    return this.repository.findByIds(ids);
  }
}
