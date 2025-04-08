import mongoose from 'mongoose';

export const validateObjectId = (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid ObjectId format');
    error.code = 400;
    return next(error);
  }
  next();
};
