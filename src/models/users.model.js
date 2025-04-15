import { model, Schema } from 'mongoose';

import { validateMongo } from '../helpers/validate-mongo.helper.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ['admin', 'user'],
      type: String,
      default: 'user',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.post('save', validateMongo);
userSchema.post('findOneAndUpdate', validateMongo);

const User = model('User', userSchema);

export { User };
