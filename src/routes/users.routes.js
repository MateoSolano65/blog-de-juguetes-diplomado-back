import { Router } from 'express';

import { userCreatedCheck, userUpdateCheck, userRoleUpdateCheck } from '../validators/users.validator.js';

import { usersController } from '../controllers/users.controller.js';

const router = Router();

const prefix = '/users';

router.post(`${prefix}`, userCreatedCheck, usersController.create);
router.get(`${prefix}`, usersController.findAll);

router.get(`${prefix}/:id`, usersController.findById);
router.put(`${prefix}/:id`, userUpdateCheck, usersController.update);
router.delete(`${prefix}/:id`, usersController.delete);

router.patch(`${prefix}/:id/role`, userRoleUpdateCheck, usersController.updateRole);

export default router;
