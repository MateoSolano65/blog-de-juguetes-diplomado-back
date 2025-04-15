import { validate } from '../helpers/validator-errors.helper.js';
import { IsString, IsIn, MinLength, IsNumber } from '../helpers/validations.helper.js';

const categories = ['Muñecas', 'Carros', 'Juegos de mesa', 'Peluches', 'Legos', 'Figuras de acción', 'Bicicletas', 'Juguetes educativos'];

export const toyCreatedCheck = [
  IsString('title', true),
  IsIn('category', categories, true),
  IsString('description', true),
  IsString('review', true),
  IsNumber('rating', true, { min: 1, max: 5 }),
  IsString('imageUrl', false),
  validate,
];

export const toyUpdateCheck = [
  IsString('title', false),
  IsIn('category', categories, false),
  IsString('description', false),
  IsString('review', false),
  IsNumber('rating', false, { min: 1, max: 5 }),
  IsString('imageUrl', false),
  validate,
];