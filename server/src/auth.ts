import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';
const JWT_EXPIRES_IN = '7d';
const COOKIE_NAME = 'token';

export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const USERS: User[] = [
  { id: 'a0000000-0000-0000-0000-000000000001', name: 'Alice Chen', email: 'alice.chen@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000002', name: 'Bob Martinez', email: 'bob.martinez@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000003', name: 'Carol Johnson', email: 'carol.johnson@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000004', name: 'David Kim', email: 'david.kim@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000005', name: 'Emma Wilson', email: 'emma.wilson@contently.com' },
];

const usersByEmail = new Map(USERS.map((u) => [u.email, u]));

function signToken(user: User): string {
  return jwt.sign(
    { sub: user.id, name: user.name, email: user.email } satisfies JWTPayload,
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

// Middleware — silently populates req.user if a valid token is present.
// Never rejects — routes that need auth use requireAuth after this.
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
      // Invalid token — leave req.user undefined, let requireAuth reject if needed
    }
  }

  next();
}

// Middleware — rejects with 401 if req.user wasn't populated by extractToken.
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  next();
}

export const authRouter = Router();

// POST /api/login — { email } → sets httpOnly cookie + returns user
authRouter.post('/login', (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) {
    res.status(400).json({ error: 'email is required' });
    return;
  }

  const user = usersByEmail.get(email.toLowerCase().trim());
  if (!user) {
    res.status(401).json({ error: 'No user found with that email' });
    return;
  }

  const token = signToken(user);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  res.json({ data: user });
});

// GET /api/me — returns the user encoded in the JWT
authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ data: { id: req.user!.sub, name: req.user!.name, email: req.user!.email } });
});

// POST /api/logout — clears the cookie
authRouter.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ data: { ok: true } });
});
