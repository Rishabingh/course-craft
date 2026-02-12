import { Types } from 'mongoose';

export interface ISection {
  course: Types.ObjectId;
  name: string;
  index: number;
}
