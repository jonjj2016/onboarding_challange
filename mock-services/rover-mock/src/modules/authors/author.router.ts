import { Router } from 'express';
import { pool } from '../../db';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';

const repository = new AuthorRepository(pool);
const service = new AuthorService(repository);
const controller = new AuthorController(service);

export const authorsRouter = Router();

authorsRouter.get('/', controller.list.bind(controller));
authorsRouter.get('/:id', controller.getById.bind(controller));
