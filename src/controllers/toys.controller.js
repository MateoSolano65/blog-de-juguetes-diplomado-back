import { request, response } from 'express';
import { toyService } from '../services/toys.service.js';

class ToysController {
  async create(req = request, res = response) {
    const { body } = req;

    const toy = await toyService.create(body);

    return res.status(201).json(toy);
  }

  async findAll(req = request, res = response) {
    const { page, limit } = req.query;
    const toys = await toyService.findAll(parseInt(page) || 1, parseInt(limit) || 10);

    return res.status(200).json(toys);
  }

  async findById(req = request, res = response) {
    const { id } = req.params;

    const toy = await toyService.findById(id);

    return res.status(200).json(toy);
  }

  async update(req = request, res = response) {
    const { id } = req.params;
    const { body } = req;

    const toyUpdate = await toyService.update(id, body);

    return res.status(200).json(toyUpdate);
  }

  async delete(req = request, res = response) {
    const { id } = req.params;

    await toyService.delete(id);

    return res.status(204).send();
  }
}

const toysController = new ToysController();

export { toysController };