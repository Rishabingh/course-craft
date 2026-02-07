import { Types } from 'mongoose';

export interface IPurchase {
  user: Types.ObjectId;
  course: Types.ObjectId;

  paymentId: string;

  createdAt: Date;
  updatedAt: Date;

  status: 'active' | 'refunded';
}
