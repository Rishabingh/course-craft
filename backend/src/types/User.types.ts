import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';

  otp?: string;
  otpExpiry?: Date;

  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;

  emailVerified: boolean;
  accountDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;

  generateAccessToken(): string;
  genrateRefreshToken(): string;
  verifyPassword(password: string): Promise<boolean>;
}
