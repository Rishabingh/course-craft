import { Course } from '../models/Course.models.js';
import { Purchase } from '../models/Purchase.models.js';
import { User } from '../models/User.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getOverviewStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ deletedAt: null });

  const totalCourses = await Course.countDocuments({ isDeleted: false });
  const totalPublicCourses = await Course.countDocuments({ isPublished: true, isDeleted: false });

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

export { getOverviewStats };
