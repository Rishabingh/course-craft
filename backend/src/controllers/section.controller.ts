import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { SectionInput } from '../schemas/section.schema.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Section } from '../models/Section.models.js';

const createSectionController = asyncHandler(async (req, res) => {
  const { course, name, index } = req.body as SectionInput;
  if (!mongoose.isValidObjectId(course)) throw new ApiError(400, 'invalid course id');
  const section = await Section.create({
    course,
    name,
    index,
  });

  return res.status(201).json(new ApiResponse(201, section, 'section created successfully'));
});

export { createSectionController };
