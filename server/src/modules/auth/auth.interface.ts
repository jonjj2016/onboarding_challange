import type { Request, Response } from 'express';
import type { UserResponseDto } from './dto';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface IAuthRepository {
  findByEmail(email: string): User | undefined;
  findById(id: string): User | undefined;
}

export interface LoginResult {
  user: UserResponseDto;
  token: string;
}

export interface IAuthService {
  login(email: string): LoginResult;
  getUser(id: string): UserResponseDto;
}

export interface IAuthController {
  login(req: Request, res: Response): void;
  me(req: Request, res: Response): void;
  logout(req: Request, res: Response): void;
}
