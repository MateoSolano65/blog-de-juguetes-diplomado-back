import { Router } from 'express';

import { userCreatedCheck } from '../validators/users.validator.js';

import { usersController } from '../controllers/users.controller.js';

const router = Router();

const prefix = '/users';

router.post(`${prefix}`, userCreatedCheck, usersController.create);
router.get(`${prefix}`, usersController.findAll);

router.get(`${prefix}/:id`, usersController.findById);
router.put(`${prefix}/:id`, usersController.update);
router.delete(`${prefix}/:id`, usersController.delete);

export default router;
