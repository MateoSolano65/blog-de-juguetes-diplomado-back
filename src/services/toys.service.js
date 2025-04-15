import { Toy } from '../models/toys.model.js';

import { TOY_NOT_FOUND } from '../constants/toy.constants.js';
import { HttpError } from '../helpers/error-handler.helper.js';

class ToysService {
  async create(dataToy) {
    const toy = new Toy(dataToy);

    await toy.save();

    return toy;
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const toys = await Toy.find({}).skip(skip).limit(limit);

    return toys;
  }

  async findById(id) {
    const toy = await Toy.findById(id);

    if (!toy) throw new HttpError(TOY_NOT_FOUND, 404);

    return toy;
  }

  async update(id, dataToy) {
    const toyUpdate = await Toy.findByIdAndUpdate(id, dataToy, {
      new: true,
    });

    if (!toyUpdate) throw new HttpError(TOY_NOT_FOUND, 404);

    return toyUpdate;
  }

  async delete(id) {
    const toyDelete = await Toy.findByIdAndDelete(id);

    if (!toyDelete) throw new HttpError(TOY_NOT_FOUND, 404);

    return toyDelete;
  }
}

const toyService = new ToysService();

export { toyService };