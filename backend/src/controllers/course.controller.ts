/* 
2. Course Management (VERY IMPORTANT)

Admin should:

Create course

Update course

Delete course

Make course public/private
*/

import { CourseInput } from '../schemas/course.schema.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { cloudinaryUpload } from '../services/cloudinaryUpload.js';
import { Course } from '../models/Course.models.js';
import mongoose from 'mongoose';
import { ICourse } from '../types/Course.types.js';

const createCourseController = asyncHandler(async (req, res) => {
  const { title, description, price, isPublished, accessType } = req.body as CourseInput;
  const image = req.file;
  let imageUrl: string | undefined;
  if (image) {
    const path = image.path;
    const response = await cloudinaryUpload(path);
    if (response.url) imageUrl = response.secure_url;
  }
  const course = await Course.create({
    title,
    description,
    price,
    isPublished,
    accessType,
    thumbnail: imageUrl,
  });
  if (course) {
    return res.status(201).json(new ApiResponse(201, { course }, 'course create successfully'));
  }
});

const getCourseController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, 'id is required to pass');
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, 'invalid course id');

  let course: ICourse | null;
  if (req.user?.role === 'admin') {
    course = await Course.findOne({ _id: id }).lean();
  } else {
    course = await Course.findOne({ _id: id, isPublished: true }).lean();
  }
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, course, 'course fetch successfully'));
});

const getAllCourseController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, 'id is required to pass');
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, 'invalid course id');

  let courses: ICourse[] | null;
  if (req.user?.role === 'admin') {
    courses = await Course.find().lean();
  } else {
    courses = await Course.find({ isPublished: true }).lean();
  }
  if (!courses) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, courses, 'course fetch successfully'));
});

export { createCourseController, getCourseController, getAllCourseController };
