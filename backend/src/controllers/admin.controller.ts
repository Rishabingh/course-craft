/*
1. User Management (Very Common)

Admin should be able to:
Get all users
Get single user
Ban / deactivate user
Delete user (optional but common)

3. Purchase / Revenue Monitoring

Admin can
View all purchases
See revenue stats
Filter by course

5. Dashboard Stats (VERY REAL WORLD)

Admin dashboard shows:
total users
total courses
total revenue
active purchases

getAllUsers
blockUser
getAdminDashboardStats
getAllUsers
getAdminDashboardStats

*/

import { Course } from '../models/Course.models.js';
import { Purchase } from '../models/Purchase.models.js';
import { User } from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

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

const getAllUsersController = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const { lastId } = req.query;

  if (limit > 50) throw new ApiError(400, 'limit too large');

  let query: any = {
    deletedAt: null,
  };

  if (lastId) {
    if (!mongoose.Types.ObjectId.isValid(lastId as string)) {
      throw new ApiError(400, 'invalid lastId');
    }
    query._id = { $gt: lastId };
  }

  const users = await User.find(query)
    .select('-password -refreshToken')
    .sort({ _id: 1 })
    .limit(limit)
    .lean();

  const lastUser = users.at(-1);
  const nextCursor = lastUser ? lastUser._id : null;

  res.status(200).json(new ApiResponse(200, { users, nextCursor }, 'users fetched successfully'));
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
  if (user.isBlocked) throw new ApiError(409, 'user already blocked');
  user.isBlocked = true;
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, { username: user.username, userId }, 'user blocked successfully'));
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

const getOverviewStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ deletedAt: null });

  const totalCourses = await Course.countDocuments();
  const totalPublicCourses = await Course.countDocuments({ isPublished: true });

  const totalPurchases = await Purchase.countDocuments();

  // todo: implement revenue, total purchase free one and paid one separetely.
  // todo: signups based on date range and revenue base on date range and course purchase based on date range.
  // todo: course wise performance views , buys , refund rate;

  res.status(200).json(
    new ApiResponse(200, {
      totalUsers,
      totalCourses,
      totalPublicCourses,
      totalPurchases,
    }),
  );
});

export {
  searchUserController,
  getAllUsersController,
  blockUserController,
  deleteUserController,
  getOverviewStats,
};

/* 
{
  totalUsers,
  totalStudents,
  totalInstructors,
  totalCourses,
  totalPublishedCourses,
  totalRevenue,
  totalOrders
}
You can do this using:

countDocuments()
*/
