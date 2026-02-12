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

export const createCourseController = asyncHandler(async (req, res) => {
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
