import { NextFunction, Request, Response } from 'express';

import { ILockController, ILockService } from './lock-content.interface';

export class LockController implements ILockController {
  // Dependency Injection via constructor
  constructor(private lockService: ILockService) {}

  /**
   * POST /api/locks/:contentId
   */
  public handleAcquireLock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { contentId } = req.params;
      // Values provided by your Auth middleware in Apollo Federation BFF
      const userId = req.user!.sub;
      const userName = req.user!.name;

      const result = await this.lockService.acquireLock(contentId, userId, userName);

      if (result.locked) {
        // 423 Locked: Resource is being accessed by another user
        res.status(423).json(result);
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/locks/:contentId
   */
  public handleReleaseLock = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { contentId } = req.params;
      const userId = req.user!.sub;

      await this.lockService.releaseLock(contentId, userId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
