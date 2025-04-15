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

    // Create the image information
    const imageInfo = {
      filename: imageFile.filename,
      path: imageFile.path
    };

    // If this is the first image and there is no main image, set it as the main one
    if ( !toy.imageUrl ) {
      toy.imageUrl = `${ UPLOADS_PATH }/${ imageFile.filename }`;
    }

    // Add the new image to the images array
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

    // If there are no previous images, initialize the array
    if ( !toy.images ) {
      toy.images = [];
    }

    // Process each uploaded image
    for ( const file of imageFiles ) {
      const imageInfo = {
        filename: file.filename,
        path: file.path
      };

      toy.images.push( imageInfo );

      // If this is the first image and there is no main image, set it as the main one
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

    // Find the image in the array
    const imageIndex = toy.images.findIndex( img => img.filename === imageFilename );

    if ( imageIndex === -1 ) throw new HttpError( IMAGE_NOT_FOUND, 404 );

    // Delete the physical file
    const deleted = deleteImage( imageFilename );

    if ( deleted ) {
      // Remove the image reference from the array
      toy.images.splice( imageIndex, 1 );

      // If the deleted image was the main one, update the main image if another is available
      if ( toy.imageUrl.includes( imageFilename ) && toy.images.length > 0 ) {
        toy.imageUrl = `${ UPLOADS_PATH }/${ toy.images[ 0 ].filename }`;
      } else if ( toy.imageUrl.includes( imageFilename ) ) {
        toy.imageUrl = '';  // No more images
      }

      toy.updatedAt = Date.now();
      await toy.save();
    }

    return toy;
  }

  async setMainImage( toyId, imageFilename ) {
    const toy = await Toy.findById( toyId );

    if ( !toy ) throw new HttpError( TOY_NOT_FOUND, 404 );

    // Verify that the image exists in the array
    const imageExists = toy.images.some( img => img.filename === imageFilename );

    if ( !imageExists ) throw new HttpError( IMAGE_NOT_FOUND, 404 );

    // Set the new main image
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