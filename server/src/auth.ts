import { Router } from 'express';

// Augment the session type so TypeScript knows our session shape
declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Pre-seeded users — same emails as rover-mock authors for convenience
const USERS: User[] = [
  { id: 'a0000000-0000-0000-0000-000000000001', name: 'Alice Chen', email: 'alice.chen@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000002', name: 'Bob Martinez', email: 'bob.martinez@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000003', name: 'Carol Johnson', email: 'carol.johnson@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000004', name: 'David Kim', email: 'david.kim@contently.com' },
  { id: 'a0000000-0000-0000-0000-000000000005', name: 'Emma Wilson', email: 'emma.wilson@contently.com' },
];

const usersByEmail = new Map(USERS.map((u) => [u.email, u]));
const usersById = new Map(USERS.map((u) => [u.id, u]));

export const authRouter = Router();

// POST /api/login — { email } → sets session cookie
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

  req.session.userId = user.id;
  res.json({ data: user });
});

// GET /api/me — returns logged-in user from session
authRouter.get('/me', (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const user = usersById.get(req.session.userId);
  if (!user) {
    res.status(401).json({ error: 'Session user not found' });
    return;
  }

  res.json({ data: user });
});

// POST /api/logout
authRouter.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ data: { ok: true } });
  });
});
