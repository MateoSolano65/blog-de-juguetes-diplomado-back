import { body } from 'express-validator';

export const IsString = (field, required) => {
  if (required) {
    return body(field)
      .trim()
      .notEmpty()
      .withMessage(`${field} is required`)
      .bail()
      .isString()
      .withMessage(`${field} must be a string`);
  }

  return body(field)
    .optional()
    .trim()
    .isString()
    .withMessage(`${field} must be a string`);
};

export const MinLength = (fieldName, length) => {
  return body(fieldName)
    .trim()
    .isLength({ min: length })
    .withMessage(`${fieldName} must be at least ${length} characters long`);
};

export const IsEmail = (fieldName, required) => {
  if (required) {
    return body(fieldName)
      .trim()
      .notEmpty()
      .withMessage(`${fieldName} is required`)
      .bail()
      .isEmail()
      .withMessage(`${fieldName} must be a valid email address`);
  }

  return body(fieldName)
    .optional()
    .trim()
    .isEmail()
    .withMessage(`${fieldName} must be a valid email address`);
};

export const IsIn = (fieldName, values, required) => {
  if (required) {
    return body(fieldName)
      .trim()
      .notEmpty()
      .withMessage(`${fieldName} is required`)
      .bail()
      .isIn(values)
      .withMessage(`${fieldName} must be one of: ${values.join(', ')}`);
  }

  return body(fieldName)
    .optional()
    .trim()
    .isIn(values)
    .withMessage(`${fieldName} must be one of: ${values.join(', ')}`);
};

export const IsNumber = (fieldName, required, options) => {
  if (required) {
    return body(fieldName)
      .notEmpty()
      .withMessage(`${fieldName} is required`)
      .bail()
      .isNumeric()
      .withMessage(`${fieldName} must be a number`)
      .bail()
      .custom((value) => {
        if (options?.min && value < options.min) {
          throw new Error(`${fieldName} must be greater than or equal to ${options.min}`);
        }
        if (options?.max && value > options.max) {
          throw new Error(`${fieldName} must be less than or equal to ${options.max}`);
        }
        return true;
      });
  }

  return body(fieldName)
    .optional()
    .isNumeric()
    .withMessage(`${fieldName} must be a number`)
    .bail()
    .custom((value) => {
      if (options?.min && value < options.min) {
        throw new Error(`${fieldName} must be greater than or equal to ${options.min}`);
      }
      if (options?.max && value > options.max) {
        throw new Error(`${fieldName} must be less than or equal to ${options.max}`);
      }
      return true;
    });
}