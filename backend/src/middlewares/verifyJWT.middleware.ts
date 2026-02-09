import { User } from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

interface JWTAccessPayload {
  _id: string;
}

export const verifyJWTmiddleware = asyncHandler(async (req, res, next) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  if (!accessToken) throw new ApiError(401, 'AccessToken missing');

  let decoded: JWTAccessPayload;

  try {
    if (!process.env.ACCESS_SECRET) throw new ApiError(500, 'ACCESS_SECRET missing');
    decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET) as JWTAccessPayload;
    if (!decoded._id) throw new ApiError(401, 'invalid access token');
  } catch (error) {
    console.log(error);
    throw new ApiError(401, 'Invalid or expired access token');
  }

  const user = await User.findById(decoded._id);
  if (!user) throw new ApiError(409, 'user missing');

  req.user = user;
  next();
});
