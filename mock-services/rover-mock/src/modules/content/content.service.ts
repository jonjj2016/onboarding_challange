import type { ContentDto, ContentListQueryDto, CreateContentDto, UpdateContentDto } from './dto';
import type { IContentRepository, IContentService, PaginatedResult } from './content.interface';

export class ContentService implements IContentService {
  constructor(private readonly repository: IContentRepository) {}

  async list(query: ContentListQueryDto): Promise<PaginatedResult<ContentDto>> {
    return this.repository.findMany(query);
  }

  async getById(id: string): Promise<ContentDto> {
    const content = await this.repository.findById(id);
    if (!content) throw new Error('Content not found');
    return content;
  }

  async getBatch(ids: string[]): Promise<ContentDto[]> {
    return this.repository.findByIds(ids);
  }

  async create(data: CreateContentDto): Promise<ContentDto> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateContentDto): Promise<ContentDto> {
    const content = await this.repository.update(id, data);
    if (!content) throw new Error('Content not found');
    return content;
  }
}
