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

  // Método para agregar una imagen al juguete
  async addImage( req = request, res = response ) {
    const { id } = req.params;
    const file = req.file;

    if ( !file ) {
      return res.status( 400 ).json( { message: 'No se ha subido ninguna imagen' } );
    }

    const updatedToy = await toyService.addImage( id, file );

    return res.status( 200 ).json( {
      message: 'Imagen agregada correctamente',
      toy: updatedToy
    } );
  }

  // Método para agregar múltiples imágenes al juguete
  async addMultipleImages( req = request, res = response ) {
    const { id } = req.params;
    const files = req.files;

    if ( !files || files.length === 0 ) {
      return res.status( 400 ).json( { message: 'No se ha subido ninguna imagen' } );
    }

    const updatedToy = await toyService.addMultipleImages( id, files );

    return res.status( 200 ).json( {
      message: `Se agregaron ${ files.length } imágenes correctamente`,
      toy: updatedToy
    } );
  }

  // Método para eliminar una imagen del juguete
  async deleteImage( req = request, res = response ) {
    const { id, filename } = req.params;

    await toyService.deleteImage( id, filename );

    return res.status( 200 ).json( {
      message: 'Imagen eliminada correctamente'
    } );
  }

  // Método para establecer una imagen como la principal
  async setMainImage( req = request, res = response ) {
    const { id, filename } = req.params;

    const updatedToy = await toyService.setMainImage( id, filename );

    return res.status( 200 ).json( {
      message: 'Imagen principal actualizada correctamente',
      toy: updatedToy
    } );
  }

  // Método para obtener todas las imágenes de un juguete
  async getAllImages( req = request, res = response ) {
    const { id } = req.params;

    const images = await toyService.getAllImages( id );

    return res.status( 200 ).json( images );
  }
}

const toysController = new ToysController();

export { toysController };