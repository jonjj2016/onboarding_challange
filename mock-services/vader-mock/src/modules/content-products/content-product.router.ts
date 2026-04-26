import { Router } from 'express';

import { pool } from '../../db';
import { ContentProductController } from './content-product.controller';
import { ContentProductRepository } from './content-product.repository';
import { ContentProductService } from './content-product.service';

const repository = new ContentProductRepository(pool);
const service = new ContentProductService(repository);
const controller = new ContentProductController(service);

export const contentProductsRouter = Router();

contentProductsRouter.get('/search-content-ids', controller.searchContentIds.bind(controller));
contentProductsRouter.get('/', controller.list.bind(controller));
contentProductsRouter.put('/:contentId', controller.update.bind(controller));
