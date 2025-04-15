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
    type: String, // Aquí puedes incluir una reseña del juguete
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  imageUrl: {
    type: String,  // URL de una imagen del juguete (opcional)
    required: false
  },
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

// Crear el modelo de juguete
const Toy = model('Toy', toySchema);

export { Toy };
