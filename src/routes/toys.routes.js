import { Router } from 'express';

import { toyCreatedCheck, toyUpdateCheck } from '../validators/toys.validator.js';

import { toysController } from '../controllers/toys.controller.js';

const router = Router();

const prefix = '/toys';

router.post(`${prefix}`, toyCreatedCheck, toysController.create);
router.get(`${prefix}`, toysController.findAll);

router.get(`${prefix}/:id`, toysController.findById);
router.put(`${prefix}/:id`, toyUpdateCheck, toysController.update);
router.delete(`${prefix}/:id`, toysController.delete);

export default router;