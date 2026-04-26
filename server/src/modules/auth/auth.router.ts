import { Router } from 'express';

import { AuthController } from './auth.controller';
import { requireAuth } from './auth.middleware';
import { InMemoryAuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

const repository = new InMemoryAuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

export const authRouter = Router();

authRouter.post('/login', controller.login.bind(controller));
authRouter.get('/me', requireAuth, controller.me.bind(controller));
authRouter.post('/logout', controller.logout.bind(controller));
