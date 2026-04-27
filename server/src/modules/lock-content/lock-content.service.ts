import { ILockRepository, ILockResponse, ILockService } from './lock-content.interface';

export class LockService implements ILockService {
  private readonly ttl: number;
  constructor(private lockRepo: ILockRepository) {
    this.ttl = 15;
  }

  async acquireLock(contentId: string, userId: string, userName: string): Promise<ILockResponse> {
    const existingLock = await this.lockRepo.getLock(contentId);

    // If lock exists and belongs to someone else
    if (existingLock && existingLock.userId !== userId) {
      return { locked: true, user: existingLock.userName };
    }

    // Otherwise, create or refresh the lock (15s TTL)
    await this.lockRepo.setLock(contentId, { userId, userName }, this.ttl);

    return { locked: false };
  }

  async releaseLock(contentId: string, userId: string): Promise<void> {
    const existingLock = await this.lockRepo.getLock(contentId);

    // Only delete if the user requesting the release is the one who owns it
    if (existingLock && existingLock.userId === userId) {
      await this.lockRepo.deleteLock(contentId);
    }
  }
}
