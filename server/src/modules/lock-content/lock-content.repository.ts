import { IContentLockRecord, ILockRepository } from './lock-content.interface';

export class LockRepository implements ILockRepository {
  // We inject the Redis client type for better intellisense
  constructor(private client: any) {}

  private getRef(contentId: string): string {
    return `lock:${contentId}`;
  }

  async getLock(contentId: string): Promise<IContentLockRecord | null> {
    const data = await this.client.get(this.getRef(contentId));
    if (!data) return null;

    try {
      return JSON.parse(data) as IContentLockRecord;
    } catch {
      return null;
    }
  }

  async setLock(contentId: string, data: IContentLockRecord, ttlSeconds: number): Promise<void> {
    // 'EX' sets the expiration in seconds
    await this.client.set(this.getRef(contentId), JSON.stringify(data), { EX: ttlSeconds });
  }

  async deleteLock(contentId: string): Promise<void> {
    await this.client.del(this.getRef(contentId));
  }
}
