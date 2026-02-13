import mongoose from 'mongoose';
import type { ISection } from '../types/Section.types.js';

const sectionSchema = new mongoose.Schema<ISection>(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Section name is required'],
    },
    name: {
      type: String,
      required: [true, 'Section name is required'],
      minlength: [8, 'Name should be at least 8 characters'],
      maxlength: [300, 'Name should be less than 300 characters'],
      trim: true,
    },
    index: {
      type: Number,
      required: [true, 'Index is required'],
      min: [0, 'Index cannot be negative'],
      max: [40, 'One course can have maximum 40 sections'],
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

sectionSchema.index({ Course: 1, index: 1 }, { unique: true });

export const Section = mongoose.model<ISection>('Section', sectionSchema);
