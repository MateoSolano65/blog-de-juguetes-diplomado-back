import { Toy } from '../models/toys.model.js';
import { TOY_NOT_FOUND, IMAGE_NOT_FOUND } from '../constants/toy.constants.js';
import { HttpError } from '../helpers/error-handler.helper.js';
import { deleteImage, UPLOADS_PATH } from '../middlewares/upload.middleware.js';

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

  async addImage( id, imageFile ) {
    const toy = await Toy.findById( id );

    if ( !toy ) throw new HttpError( TOY_NOT_FOUND, 404 );

    // Crear la información de la imagen
    const imageInfo = {
      filename: imageFile.filename,
      path: imageFile.path
    };

    // Si es la primera imagen y no hay imagen principal, establecerla como principal
    if ( !toy.imageUrl ) {
      toy.imageUrl = `${ UPLOADS_PATH }/${ imageFile.filename }`;
    }

    // Agregar la nueva imagen al array de imágenes
    if ( !toy.images ) {
      toy.images = [];
    }

    toy.images.push( imageInfo );
    toy.updatedAt = Date.now();

    await toy.save();

    return toy;
  }

  async addMultipleImages( id, imageFiles ) {
    const toy = await Toy.findById( id );

    if ( !toy ) throw new HttpError( TOY_NOT_FOUND, 404 );

    // Si no hay imágenes previas, inicializar el array
    if ( !toy.images ) {
      toy.images = [];
    }

    // Procesar cada imagen subida
    for ( const file of imageFiles ) {
      const imageInfo = {
        filename: file.filename,
        path: file.path
      };

      toy.images.push( imageInfo );

      // Si es la primera imagen y no hay imagen principal, establecerla como principal
      if ( !toy.imageUrl ) {
        toy.imageUrl = `${ UPLOADS_PATH }/${ file.filename }`;
      }
    }

    toy.updatedAt = Date.now();
    await toy.save();

    return toy;
  }

  async deleteImage( toyId, imageFilename ) {
    const toy = await Toy.findById( toyId );

    if ( !toy ) throw new HttpError( TOY_NOT_FOUND, 404 );

    // Buscar la imagen en el array
    const imageIndex = toy.images.findIndex( img => img.filename === imageFilename );

    if ( imageIndex === -1 ) throw new HttpError( IMAGE_NOT_FOUND, 404 );

    // Eliminar el archivo físico
    const deleted = deleteImage( imageFilename );

    if ( deleted ) {
      // Eliminar la referencia de la imagen del array
      toy.images.splice( imageIndex, 1 );

      // Si la imagen eliminada era la principal, actualizar la imagen principal si hay otra disponible
      if ( toy.imageUrl.includes( imageFilename ) && toy.images.length > 0 ) {
        toy.imageUrl = `${ UPLOADS_PATH }/${ toy.images[ 0 ].filename }`;
      } else if ( toy.imageUrl.includes( imageFilename ) ) {
        toy.imageUrl = '';  // No hay más imágenes
      }

      toy.updatedAt = Date.now();
      await toy.save();
    }

    return toy;
  }

  async setMainImage( toyId, imageFilename ) {
    const toy = await Toy.findById( toyId );

    if ( !toy ) throw new HttpError( TOY_NOT_FOUND, 404 );

    // Verificar que la imagen existe en el array
    const imageExists = toy.images.some( img => img.filename === imageFilename );

    if ( !imageExists ) throw new HttpError( IMAGE_NOT_FOUND, 404 );

    // Establecer la nueva imagen principal
    toy.imageUrl = `${ UPLOADS_PATH }/${ imageFilename }`;
    toy.updatedAt = Date.now();

    await toy.save();

    return toy;
  }

  async getAllImages( toyId ) {
    const toy = await Toy.findById( toyId );

    if ( !toy ) throw new HttpError( TOY_NOT_FOUND, 404 );

    return toy.images || [];
  }
}

const toyService = new ToysService();

export { toyService };