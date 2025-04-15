import mongoose from 'mongoose';
import { validateMongo } from '../helpers/validate-mongo.helper.js';

const { model } = mongoose;

const toySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Muñecas', 'Carros', 'Juegos de mesa', 'Peluches', 'Legos', 'Figuras de acción', 'Bicicletas', 'Juguetes educativos'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  review: {
    type: String, // Here you can include a toy review
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  imageUrl: {
    type: String,  // URL of a toy image (optional)
    required: false
  },
  images: [{
    filename: String,
    path: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: {
    type: [String], // Para agregar etiquetas relacionadas con el artículo, como "recomendado", "para niños", etc.
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

toySchema.post('save', validateMongo);
toySchema.post('findOneAndUpdate', validateMongo);

// Create the toy model
const Toy = model('Toy', toySchema);

export { Toy };
