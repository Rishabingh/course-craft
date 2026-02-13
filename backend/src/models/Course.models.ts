import { ICourse } from '../types/Course.types.js';
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    default: 'https://placehold.co/1200x750',
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  accessType: {
    type: String,
    enum: ['FREE_OPEN', 'FREE_LOGIN', 'PAID'],
    default: 'FREE_OPEN',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = mongoose.model('Course', courseSchema);
