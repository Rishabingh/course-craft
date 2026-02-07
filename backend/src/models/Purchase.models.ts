import { IPurchase } from '../types/Purchase.types.js';
import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema<IPurchase>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'refunded'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export const Purchase = mongoose.model('Purchase', purchaseSchema);
