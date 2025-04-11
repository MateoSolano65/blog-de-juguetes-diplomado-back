import { validate } from '../helpers/validator-errors.helper.js';
import { IsEmail, IsString, MinLength } from '../helpers/validations.helper.js';

export const userCreatedCheck = [
  IsString('name', true),
  IsEmail('email', true),
  MinLength('password', 8),
  validate,
];
