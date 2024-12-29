import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  author: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);