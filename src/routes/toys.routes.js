import { Router } from 'express';

import { toyCreatedCheck, toyUpdateCheck } from '../validators/toys.validator.js';
import { handleUploadErrors, handleMultipleUploadErrors } from '../middlewares/upload.middleware.js';
import { toysController } from '../controllers/toys.controller.js';

const router = Router();

const prefix = '/toys';

router.post(`${prefix}`, toyCreatedCheck, toysController.create);
router.get(`${prefix}`, toysController.findAll);
router.get(`${prefix}/:id`, toysController.findById);
router.put(`${prefix}/:id`, toyUpdateCheck, toysController.update);
router.delete(`${prefix}/:id`, toysController.delete);

// Rutas para gestionar imágenes
router.post(`${prefix}/:id/images`, handleUploadErrors, toysController.addImage);
router.post(`${prefix}/:id/images/multiple`, handleMultipleUploadErrors, toysController.addMultipleImages);
router.get(`${prefix}/:id/images`, toysController.getAllImages);
router.delete(`${prefix}/:id/images/:filename`, toysController.deleteImage);
router.put(`${prefix}/:id/images/:filename/main`, toysController.setMainImage);

export default router;