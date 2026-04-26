import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import type { JWTPayload } from './dto';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';
const COOKIE_NAME = 'token';

// Silently populates req.user when a valid token is present.
// Always calls next() — never rejects on its own.
export function extractToken(req: Request, _res: Response, next: NextFunction): void {
  const fromCookie = req.cookies?.[COOKIE_NAME] as string | undefined;
  const fromHeader = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : undefined;

  const raw = fromCookie ?? fromHeader;

  if (raw) {
    try {
      req.user = jwt.verify(raw, JWT_SECRET) as JWTPayload;
    } catch {
      // Expired or tampered token — leave req.user undefined
    }
  }

  next();
}

// Guards a route: rejects with 401 if extractToken didn't populate req.user.
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  next();
}
