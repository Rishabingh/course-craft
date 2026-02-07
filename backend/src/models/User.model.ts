import { IUser } from '../types/User.types.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    authProvider: {
      type: String,
      enum: ['local', 'google'],
      required: true,
    },
    providerId: String, //google user ID

    otp: String,
    otpExpiry: Date,
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    emailVerified: Boolean,
    accountDeleted: Boolean,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

userSchema.methods.verifyPassword = async function (this: IUser, password: string) {
  if (this.password) {
    return bcrypt.compare(password, this.password);
  }
};

userSchema.methods.generateRefreshToken = async function (this: IUser) {
  if (!process.env.REFRESH_SECRET) throw new Error('app can not run without refresh secret');
  const refreshToken = jwt.sign({ _id: this._id }, process.env.REFRESH_SECRET, {
    expiresIn: '30d',
  });
  this.refreshToken = refreshToken;
  return refreshToken;
};

userSchema.methods.generateAccessToken = async function (this: IUser) {
  if (!process.env.ACCESS_SECRET) throw new Error('app can not run without access secret');
  const accessToken = jwt.sign({ _id: this._id }, process.env.ACCESS_SECRET, { expiresIn: '5m' });
  return accessToken;
};

export const User = mongoose.model('User', userSchema);
