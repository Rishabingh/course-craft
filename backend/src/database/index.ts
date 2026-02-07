import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('app can not run without database uri');

    const connection = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw error;
  }
};
