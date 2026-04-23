import jwt from 'jsonwebtoken';
import type { IAuthRepository, IAuthService, LoginResult } from './auth.interface';
import type { JWTPayload, UserResponseDto } from './dto';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';
const JWT_EXPIRES_IN = '7d';

export class AuthService implements IAuthService {
  constructor(private readonly repository: IAuthRepository) {}

  login(email: string): LoginResult {
    const user = this.repository.findByEmail(email);
    if (!user) {
      throw new Error('No user found with that email');
    }

    const payload: JWTPayload = { sub: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  }

  getUser(id: string): UserResponseDto {
    const user = this.repository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return { id: user.id, name: user.name, email: user.email };
  }
}
