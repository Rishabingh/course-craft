import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { UsernameInput } from '../schemas/user.schemas.js';
import { Purchase } from '../models/Purchase.models.js';
import { Course } from '../models/Course.models.js';

const meController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, 'user not found');

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

  const courses = await Course.find({ _id: { $in: courseIds } })
    .select('-public')
    .lean();

  res.status(200).json(new ApiResponse(200, courses, 'course fetched successfully'));
});

export { meController, changeUsername, meCourseController };

/*
todo:
Get Profile

Update Profile

Change avatar
*/
