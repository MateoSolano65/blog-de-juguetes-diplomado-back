import { User } from '../models/users.model.js';

import { USER_NOT_FOUND } from '../constants/user.constants.js';
import { HttpError } from '../helpers/error-handler.helper.js';

class UsersService {
  async create(dataUser) {
    const user = new User(dataUser);

    await user.save();

    return user;
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const users = await User.find({}).skip(skip).limit(limit);

    return users;
  }

  async findById(id) {
    const user = await User.findById(id);

    if (!user) throw new HttpError(USER_NOT_FOUND, 404);

    return user;
  }

  async update(id, dataUser) {
    const userUpdate = await User.findByIdAndUpdate(id, dataUser, {
      new: true,
    });

    if (!userUpdate) throw new HttpError(USER_NOT_FOUND, 404);

    return userUpdate;
  }

  async delete(id) {
    const userDelete = await User.findByIdAndDelete(id);

    if (!userDelete) throw new HttpError(USER_NOT_FOUND, 404);

    return userDelete;
  }
}

const userService = new UsersService();

export { userService };
