import { NextFunction, Request, Response } from 'express';

export function artificialDelay(_req: Request, _res: Response, next: NextFunction): void {
  const ms = Math.floor(Math.random() * 101) + 100; // 100–200ms
  setTimeout(next, ms);
}
