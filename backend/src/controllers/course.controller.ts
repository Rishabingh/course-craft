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
import { Section } from '../models/Section.models.js';
import { Video } from '../models/Video.models.js';

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
  const courses = await Course.find().lean();

  res.status(200).json(new ApiResponse(200, courses, 'course fetch successfully'));
});

const getAdminCourseController = asyncHandler(async (req, res) => {
  const courses = await Course.find().lean();

  res.status(200).json(new ApiResponse(200, courses, 'course fetch successfully'));
});

const deleteCourseController = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId || !mongoose.isValidObjectId(courseId))
    throw new ApiError(400, 'provide a valid id');

  const course = await Course.findOne({ _id: courseId, isDeleted: false });
  if (!course) throw new ApiError(404, 'course not found');
  course.isDeleted = true;
  course.save({ validateBeforeSave: false });

  await Section.updateMany({ course: courseId }, { isDeleted: true });
  const sections = await Section.find({ course: courseId });

  const sectionsId = sections.map((section) => section._id);
  await Video.updateMany({ section: { $in: sectionsId } }, { isDeleted: true });

  res.status(200).json(new ApiResponse(200, course, 'deleted successfully'));
});

export {
  createCourseController,
  getCourseController,
  getAllCourseController,
  deleteCourseController,
  getAdminCourseController,
};
