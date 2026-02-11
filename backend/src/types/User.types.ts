import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';

  authProvider: 'local' | 'google';
  providerId?: string; //google user ID

  otp?: string;
  otpExpiry?: Date;

  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;

  emailVerified: boolean;
  deletedAt: Date | null;
  isBlocked: boolean;

  createdAt: Date;
  updatedAt: Date;

  generateAccessToken(): string;
  generateRefreshToken(): string;
  verifyPassword(password: string): Promise<boolean>;
}
