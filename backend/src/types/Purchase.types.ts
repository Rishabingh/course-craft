import { Types } from 'mongoose';

export interface IPurchase {
  user: Types.ObjectId;
  course: Types.ObjectId;

  paymentId: string;

  purchasedAt: Date;

  status: 'active' | 'refunded';
}
