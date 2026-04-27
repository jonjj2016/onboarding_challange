import express from 'express';

import redisClient from '../../redis-client';
import { requireAuth } from '../auth';
import { LockController } from './lock-content.controller';
import { LockRepository } from './lock-content.repository';
import { LockService } from './lock-content.service';

const router = express.Router();

// 1. Initialize Repo (Inject Redis Client)
const repository = new LockRepository(redisClient);

// 2. Initialize Service (Inject Repo)
const service = new LockService(repository);

// 3. Initialize Controller (Inject Service)
const controller = new LockController(service);

/**
 * 4. Define Routes
 * Note: Use arrow functions or .bind(lockController) if not using
 * class properties to ensure 'this' context is preserved.
 */
router.post('/:contentId', requireAuth, controller.handleAcquireLock.bind(controller));

router.delete('/:contentId', requireAuth, controller.handleReleaseLock.bind(controller));

export { router as lockRouter };
