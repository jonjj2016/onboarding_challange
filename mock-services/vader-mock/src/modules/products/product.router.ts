import { Router } from 'express';
import { pool } from '../../db';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

const repository = new ProductRepository(pool);
const service = new ProductService(repository);
const controller = new ProductController(service);

export const productsRouter = Router();

productsRouter.get('/', controller.list.bind(controller));
productsRouter.get('/:id', controller.getById.bind(controller));
