import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { UsernameInput } from '../schemas/user.schemas.js';
import { Purchase } from '../models/Purchase.models.js';
import { Course } from '../models/Course.models.js';
import mongoose from 'mongoose';
import { User } from '../models/User.model.js';

const meController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user || user.deletedAt) throw new ApiError(404, 'user not found');
  if (user.isBlocked) throw new ApiError(400, 'user is blocked');

  const responseUser = {
    username: user.username,
    email: user.email,
    role: user.role,
  };
  return res.status(200).json(new ApiResponse(200, responseUser, 'user fetch successfully'));
});

const changeUsername = asyncHandler(async (req, res) => {
  const { username } = req.body as UsernameInput;
  const user = req.user;

  if (!user) throw new ApiError(404, 'user not found');

  user.username = username;
  await user.save();
  return res.status(200).json(new ApiResponse(200, { username }, 'Username updated'));
});

const meCourseController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(404, 'user not found');

  const userId = user._id;

  const userPurchases = await Purchase.find({ user: userId, status: 'active' });

  if (userPurchases.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], 'course not found'));
  }

  const courseIds = userPurchases.map((p) => p.course);

  const courses = await Course.find({
    _id: { $in: courseIds },
    isDeleted: false,
    isPublished: true,
  })
    .select('-isPublished')
    .lean();
  res.status(200).json(new ApiResponse(200, courses, 'course fetched successfully'));
});

const deleteUserController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (typeof userId !== 'string') throw new ApiError(400, 'userId should be string');
  const admin = req.user;
  if (!admin) throw new ApiError(404, 'admin not found');
  if (!userId) throw new ApiError(400, 'cannot execute function without userid');
  if (!mongoose.Types.ObjectId.isValid(userId)) throw new ApiError(400, 'invalid user id');
  if (admin._id.equals(userId)) throw new ApiError(409, 'admin cannot be deleted');
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'user not found');
  if (user.deletedAt) throw new ApiError(409, 'user already deleted');
  user.deletedAt = new Date();
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, { username: user.username, userId }, 'user deleted successfully'));
});

const getAllUsersController = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const { lastCursor } = req.query;

  let query: any = {};

  if (lastCursor) {
    if (!mongoose.Types.ObjectId.isValid(lastCursor as string)) {
      throw new ApiError(400, 'invalid lastId');
    }
    query._id = { $gt: lastCursor };
  }

  const users = await User.find(query)
    .select(
      '-password -refreshToken -providerId -otp -otpExpiry -forgotPasswordToken -forgotPasswordTokenExpiry',
    )
    .sort({ _id: 1 })
    .limit(limit + 1)
    .lean();

  let nextCursor = null;
  let hasMore = false;

  if (users.length > limit) {
    hasMore = true;
    nextCursor = users[limit]?._id;
    users.pop();
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { users, pagination: { hasMore, nextCursor } },
        'users fetched successfully',
      ),
    );
});

const searchUserController = asyncHandler(async (req, res) => {
  const { identifier } = req.query;

  if (!identifier) throw new ApiError(400, 'identifier is required');

  const query: { $or: {}[] } = {
    $or: [{ email: identifier }, { username: identifier }],
  };

  if (mongoose.Types.ObjectId.isValid(identifier as string)) {
    query.$or.push({ _id: identifier });
  }

  const user = await User.findOne(query).select('-password -refreshToken').lean();

  if (!user) throw new ApiError(404, 'user not found');

  res.status(200).json(new ApiResponse(200, user, 'user found successfully'));
});

const blockUserController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (typeof userId !== 'string') throw new ApiError(400, 'userId should be string');
  const admin = req.user;
  if (!admin) throw new ApiError(404, 'admin not found');
  if (!userId) throw new ApiError(400, 'cannot execute function without userid');
  if (!mongoose.Types.ObjectId.isValid(userId)) throw new ApiError(400, 'invalid user id');
  if (admin._id.equals(userId)) throw new ApiError(409, 'admin cannot be blocked');
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'user not found');
  if (!user.deletedAt) throw new ApiError(400, 'user account is deleted');
  if (user.isBlocked) throw new ApiError(409, 'user already blocked');
  user.isBlocked = true;
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, { username: user.username, userId }, 'user blocked successfully'));
});

export {
  meController,
  changeUsername,
  meCourseController,
  deleteUserController,
  getAllUsersController,
  searchUserController,
  blockUserController,
};

/*
todo:
Get Profile

Update Profile

Change avatar
*/
