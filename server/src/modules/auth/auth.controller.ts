import type { Request, Response } from 'express';

import type { IAuthController, IAuthService } from './auth.interface';
import type { LoginRequestDto } from './dto';

const COOKIE_NAME = 'token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export class AuthController implements IAuthController {
  constructor(private readonly service: IAuthService) {}

  login(req: Request, res: Response): void {
    const { email } = req.body as LoginRequestDto;

    if (!email) {
      res.status(400).json({ error: 'email is required' });
      return;
    }

    try {
      const { user, token } = this.service.login(email);

      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
      });

      res.json({ data: user });
    } catch (err) {
      res.status(401).json({ error: err instanceof Error ? err.message : 'Login failed' });
    }
  }

  me(req: Request, res: Response): void {
    try {
      // req.user is populated by extractToken middleware
      const user = this.service.getUser(req.user!.sub);
      res.json({ data: user });
    } catch (err) {
      res.status(404).json({ error: err instanceof Error ? err.message : 'User not found' });
    }
  }

  logout(_req: Request, res: Response): void {
    res.clearCookie(COOKIE_NAME);
    res.json({ data: { ok: true } });
  }
}
