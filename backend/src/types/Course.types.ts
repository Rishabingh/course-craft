import { Document } from 'mongoose';
import { CourseInput } from '../schemas/course.schema.js';

export interface ICourse extends CourseInput, Document {
  createdAt: Date;
  updatedAt: Date;
  thumbnail: string;
}
