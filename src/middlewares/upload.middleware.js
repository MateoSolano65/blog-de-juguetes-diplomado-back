import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { HttpError } from '../helpers/error-handler.helper.js';

// Configurar la carpeta de destino para las imágenes usando variables de entorno
const UPLOADS_DIR = process.env.UPLOADS_DIR || './uploads/toys';
const UPLOADS_PATH = process.env.UPLOADS_PATH || '/uploads/toys';
const MAX_FILE_SIZE = parseInt( process.env.MAX_FILE_SIZE ) || ( 5 * 1024 * 1024 ); // 5MB por defecto
const MAX_FILES = parseInt( process.env.MAX_FILES ) || 5; // 5 archivos por defecto

// Crear la carpeta si no existe
if ( !fs.existsSync( UPLOADS_DIR ) ) {
  fs.mkdirSync( UPLOADS_DIR, { recursive: true } );
}

// Configuración de almacenamiento
const storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {
    cb( null, UPLOADS_DIR );
  },
  filename: function ( req, file, cb ) {
    const uniqueFilename = `${ uuidv4() }${ path.extname( file.originalname ) }`;
    cb( null, uniqueFilename );
  }
} );

// Filtro para aceptar solo imágenes
const fileFilter = ( req, file, cb ) => {
  const allowedTypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp' ];

  if ( allowedTypes.includes( file.mimetype ) ) {
    cb( null, true );
  } else {
    cb( new HttpError( 'Formato de archivo no soportado. Solo se permiten imágenes: jpeg, jpg, png, gif, webp', 400 ), false );
  }
};

// Configuración para subida de una sola imagen
const uploadSingle = multer( {
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  }
} ).single( 'image' );

// Configuración para subida de múltiples imágenes
const uploadMultiple = multer( {
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  }
} ).array( 'images', MAX_FILES );

// Middleware para manejar errores de multer
const handleUploadErrors = ( req, res, next ) => {
  uploadSingle( req, res, ( err ) => {
    if ( err instanceof multer.MulterError ) {
      if ( err.code === 'LIMIT_FILE_SIZE' ) {
        return res.status( 400 ).json( { message: `El archivo es demasiado grande. El tamaño máximo es ${ MAX_FILE_SIZE / ( 1024 * 1024 ) }MB.` } );
      }
      return res.status( 400 ).json( { message: `Error en la subida: ${ err.message }` } );
    } else if ( err ) {
      return res.status( err.statusCode || 500 ).json( { message: err.message } );
    }
    next();
  } );
};

// Middleware para manejar errores de multer en subidas múltiples
const handleMultipleUploadErrors = ( req, res, next ) => {
  uploadMultiple( req, res, ( err ) => {
    if ( err instanceof multer.MulterError ) {
      if ( err.code === 'LIMIT_FILE_SIZE' ) {
        return res.status( 400 ).json( { message: `El archivo es demasiado grande. El tamaño máximo es ${ MAX_FILE_SIZE / ( 1024 * 1024 ) }MB.` } );
      }
      return res.status( 400 ).json( { message: `Error en la subida: ${ err.message }` } );
    } else if ( err ) {
      return res.status( err.statusCode || 500 ).json( { message: err.message } );
    }
    next();
  } );
};

// Función para eliminar imagen del sistema de archivos
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