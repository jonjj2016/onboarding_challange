import { Router } from 'express';
import { pool } from '../../db';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { ContentService } from './content.service';

const repository = new ContentRepository(pool);
const service = new ContentService(repository);
const controller = new ContentController(service);

export const contentRouter = Router();

contentRouter.get('/', controller.list.bind(controller));
contentRouter.get('/:id', controller.getById.bind(controller));
contentRouter.post('/', controller.create.bind(controller));
contentRouter.patch('/:id', controller.update.bind(controller));
