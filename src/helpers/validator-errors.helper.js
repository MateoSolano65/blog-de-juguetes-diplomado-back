import { request, response } from 'express';
import { validationResult } from 'express-validator';

const validate = (req = request, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((error) => error.msg)
      .join(', ');

    return res.status(400).json({ errors: formattedErrors });
  }

  next();
};

export { validate };
