import type { IAuthRepository, User } from './auth.interface';

const USERS: User[] = [
  {
    id: 'a0000000-0000-0000-0000-000000000001',
    name: 'Alice Chen',
    email: 'alice.chen@contently.com',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    name: 'Bob Martinez',
    email: 'bob.martinez@contently.com',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000003',
    name: 'Carol Johnson',
    email: 'carol.johnson@contently.com',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000004',
    name: 'David Kim',
    email: 'david.kim@contently.com',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000005',
    name: 'Emma Wilson',
    email: 'emma.wilson@contently.com',
  },
];

export class InMemoryAuthRepository implements IAuthRepository {
  private readonly byEmail = new Map<string, User>(USERS.map((u) => [u.email, u]));
  private readonly byId = new Map<string, User>(USERS.map((u) => [u.id, u]));

  findByEmail(email: string): User | undefined {
    return this.byEmail.get(email.toLowerCase().trim());
  }

  findById(id: string): User | undefined {
    return this.byId.get(id);
  }
}
