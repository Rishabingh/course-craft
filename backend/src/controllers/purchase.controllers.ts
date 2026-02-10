import type { purchaseCourseInput } from '../schemas/purchase.schemas.js';
import { Purchase } from '../models/Purchase.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Course } from '../models/Course.models.js';

const purchaseCourseController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(404, 'user not found');
  const { course } = req.body as purchaseCourseInput;

  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) throw new ApiError(404, 'course does not exist');

  const isAlreadyBought = await Purchase.findOne({ user: user._id, course });

  if (isAlreadyBought) throw new ApiError(409, 'course already bought');

  const purchase = await Purchase.create({
    user: user._id,
    course,
    status: 'active',
    paymentId: `dev_${user._id}_${Date.now()}`,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        purchaseId: purchase._id,
        payment: {
          provider: 'razorpay',
          paymentId: purchase.paymentId,
          orderId: purchase.paymentId + 1,
        },
        courseId: purchase.course,
      },
      'course bought successfully',
    ),
  );
});

const userPurchaseHistoryController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(404, 'user not found');

  const purchases = await Purchase.find({ user: user._id })
    .populate('course', 'title thumbnail price')
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json(new ApiResponse(200, purchases, 'purchase fetch successfully'));
});

const userPurchaseHistoryByIdController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(404, 'user not found');
  const { purchaseId } = req.params;
  if (!purchaseId) throw new ApiError(400, 'id is required to get data');

  const purchase = await Purchase.findOne({
    _id: purchaseId,
    user: user._id,
  });
  if (!purchase) throw new ApiError(404, 'purchase not found');

  return res.status(200).json(new ApiResponse(200, purchase, 'purchase fetch successfully'));
});

export {
  purchaseCourseController,
  userPurchaseHistoryController,
  userPurchaseHistoryByIdController,
};
