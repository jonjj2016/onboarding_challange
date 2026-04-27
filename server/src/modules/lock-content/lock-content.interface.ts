import { NextFunction, Request, Response } from 'express';

export interface ILockController {
  handleAcquireLock(req: Request, res: Response, next: NextFunction): Promise<void>;
  handleReleaseLock(req: Request, res: Response, next: NextFunction): Promise<void>;
}

// The object stored inside Redis
export interface IContentLockRecord {
  userId: string;
  userName: string;
}

// The response sent to the frontend
export interface ILockResponse {
  locked: boolean;
  user?: string;
}

export interface ILockRepository {
  /** Gets the lock data for a specific content ID */
  getLock(contentId: string): Promise<IContentLockRecord | null>;

  /** Sets a lock with a specific TTL (seconds) */
  setLock(contentId: string, data: IContentLockRecord, ttlSeconds: number): Promise<void>;

  /** Deletes a lock record */
  deleteLock(contentId: string): Promise<void>;
}

export interface ILockService {
  /** * Logic to acquire or refresh a lock.
   * Returns a LockResponse indicating success or who owns the current lock.
   */
  acquireLock(contentId: string, userId: string, userName: string): Promise<ILockResponse>;

  /** * Logic to safely release a lock only if it belongs to the requesting user.
   */
  releaseLock(contentId: string, userId: string): Promise<void>;
}
