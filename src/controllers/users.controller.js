import { request, response } from 'express';
import { userService } from '../services/users.service.js';
import { PasswordHelper } from '../helpers/password.helper.js';

const formatUserResponse = (user) => {
  const { password, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};

class UsersController {
  async create(req = request, res = response) {
    const { body } = req;
    const { password } = body;

    const passwordHash = await PasswordHelper.hashPassword(password);
    body.password = passwordHash;

    const user = await userService.create(body);

    return res.status(201).json(formatUserResponse(user));
  }

  async findAll(req = request, res = response) {
    const users = await userService.findAll();

    const responseFormatted = users.map(formatUserResponse);

    return res.status(200).json(responseFormatted);
  }

  async findById(req = request, res = response) {
    const { id } = req.params;

    const user = await userService.findById(id);

    return res.status(200).json(formatUserResponse(user));
  }

  async update(req = request, res = response) {
    const { id } = req.params;
    const { body } = req;

    if (body.password) {
      const passwordHash = await PasswordHelper.hashPassword(body.password);
      body.password = passwordHash;
    }

    const userUpdate = await userService.update(id, body);

    return res.status(200).json(formatUserResponse(userUpdate));
  }

  async delete(req = request, res = response) {
    const { id } = req.params;

    await userService.delete(id);

    return res.status(204).send();
  }

  async updateRole(req = request, res = response) {
    const { id } = req.params;
    const { role } = req.body;

    const userUpdate = await userService.update(id, { role });

    return res.status(200).json(formatUserResponse(userUpdate));
  }
}

const usersController = new UsersController();

export { usersController };
