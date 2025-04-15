import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { HttpError } from '../helpers/error-handler.helper.js';

// Configure the destination folder for images using environment variables
const UPLOADS_DIR = process.env.UPLOADS_DIR || './uploads/toys';
const UPLOADS_PATH = process.env.UPLOADS_PATH || '/uploads/toys';
const MAX_FILE_SIZE = parseInt( process.env.MAX_FILE_SIZE ) || ( 5 * 1024 * 1024 ); // 5MB default
const MAX_FILES = parseInt( process.env.MAX_FILES ) || 5; // 5 files default

// Create the folder if it doesn't exist
if ( !fs.existsSync( UPLOADS_DIR ) ) {
  fs.mkdirSync( UPLOADS_DIR, { recursive: true } );
}

// Storage configuration
const storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {
    cb( null, UPLOADS_DIR );
  },
  filename: function ( req, file, cb ) {
    const uniqueFilename = `${ uuidv4() }${ path.extname( file.originalname ) }`;
    cb( null, uniqueFilename );
  }
} );

// Filter to accept only images
const fileFilter = ( req, file, cb ) => {
  const allowedTypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp' ];

  if ( allowedTypes.includes( file.mimetype ) ) {
    cb( null, true );
  } else {
    cb( new HttpError( 'Unsupported file format. Only images are allowed: jpeg, jpg, png, gif, webp', 400 ), false );
  }
};

// Configuration for single image upload
const uploadSingle = multer( {
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  }
} ).single( 'image' );

// Configuration for multiple image uploads
const uploadMultiple = multer( {
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  }
} ).array( 'images', MAX_FILES );

// Middleware to handle multer errors
const handleUploadErrors = ( req, res, next ) => {
  uploadSingle( req, res, ( err ) => {
    if ( err instanceof multer.MulterError ) {
      if ( err.code === 'LIMIT_FILE_SIZE' ) {
        return res.status( 400 ).json( { message: `The file is too large. Maximum size is ${ MAX_FILE_SIZE / ( 1024 * 1024 ) }MB.` } );
      }
      return res.status( 400 ).json( { message: `Upload error: ${ err.message }` } );
    } else if ( err ) {
      return res.status( err.statusCode || 500 ).json( { message: err.message } );
    }
    next();
  } );
};

// Middleware to handle multer errors for multiple uploads
const handleMultipleUploadErrors = ( req, res, next ) => {
  uploadMultiple( req, res, ( err ) => {
    if ( err instanceof multer.MulterError ) {
      if ( err.code === 'LIMIT_FILE_SIZE' ) {
        return res.status( 400 ).json( { message: `The file is too large. Maximum size is ${ MAX_FILE_SIZE / ( 1024 * 1024 ) }MB.` } );
      }
      return res.status( 400 ).json( { message: `Upload error: ${ err.message }` } );
    } else if ( err ) {
      return res.status( err.statusCode || 500 ).json( { message: err.message } );
    }
    next();
  } );
};

// Function to delete image from the file system
const deleteImage = ( filename ) => {
  const filePath = path.join( UPLOADS_DIR, filename );
  if ( fs.existsSync( filePath ) ) {
    fs.unlinkSync( filePath );
    return true;
  }
  return false;
};

export {
  handleUploadErrors,
  handleMultipleUploadErrors,
  deleteImage,
  UPLOADS_DIR,
  UPLOADS_PATH
};