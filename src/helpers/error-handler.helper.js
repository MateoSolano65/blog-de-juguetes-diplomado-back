import { request, response } from 'express';

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = String(errorCode).length > 3 ? 500 : errorCode;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const message = err.code ? err.message : 'Internal server error';
  return res.status(err.code || 500).json({ message });
};

export { HttpError, errorHandler };
