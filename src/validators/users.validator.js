import { body } from 'express-validator';
import { validate } from '../helpers/validatorErrors.helper.js';

export const userCreatedCheck = [
  body('name').isString().withMessage('Name must be a string'),

  body('email').isEmail().withMessage('Email must be a valid email address'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validate,
];
