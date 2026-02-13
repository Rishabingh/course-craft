import mongoose from 'mongoose';
import { IVideo } from '../types/Video.types.js';

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: 'https://placehold.co/1200x750',
    },
    videoUrl: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    section: {
      type: mongoose.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

videoSchema.index({ section: 1, index: 1 }, { unique: true });

export const Video = mongoose.model('Video', videoSchema);
