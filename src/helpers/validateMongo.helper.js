import { HttpError } from './errorHandler.helper.js';

function validateMongo(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern);
    const value = Object.values(error.keyValue);
    const message = `There is already a registry with the same ${field}: ${value}`;

    next(new HttpError(message, 400));
  }

  if (error.name === 'ValidationError') {
    const fields = Object.keys(error.errors).join(', ');
    const message = `Fields: ${fields} are required.`;

    next(new HttpError(message, 400));
  }

  next(error);
}

export { validateMongo };
