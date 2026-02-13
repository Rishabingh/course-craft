import type { Document } from 'mongoose';
import type { Types } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  section: Types.ObjectId;
  thumbnail: string;
  index: number;
  videoUrl: string;
  isDeleted: boolean;
}
