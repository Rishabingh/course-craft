import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { SectionInput } from '../schemas/section.schema.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Section } from '../models/Section.models.js';
import { Course } from '../models/Course.models.js';

const createSectionController = asyncHandler(async (req, res) => {
  const { course, name, index } = req.body as SectionInput;
  if (!mongoose.isValidObjectId(course)) throw new ApiError(400, 'invalid course id');

  const courseExists = await Course.findOne({
    _id: course,
    isDeleted: false,
  });

  if (!courseExists) {
    throw new ApiError(404, 'course not found');
  }

  const section = await Section.create({
    course,
    name,
    index,
  });

  return res.status(201).json(new ApiResponse(201, section, 'section created successfully'));
});

const deleteSectionController = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  if (!sectionId) throw new ApiError(400, 'bad request');

  if (!mongoose.isValidObjectId(sectionId)) throw new ApiError(400, 'invalid id');

  const section = await Section.findByIdAndUpdate(sectionId, { isDeleted: true }, { new: true });

  if (!section) throw new ApiError(404, 'Section not found');

  res.status(200).json(new ApiResponse(200, section, 'deleted successfully'));
});

const getSectionOfCourseController = asyncHandler(async (req, res) => {
  const course = req.query.course;
  if (!course || !mongoose.isValidObjectId(course as string)) {
    throw new ApiError(400, 'Invalid course id');
  }

  if (!course) throw new ApiError(400, 'section query cannot be empty');

  const sections = await Section.find({ course, isDeleted: false }).sort({ index: 1 }).lean();
  res.status(200).json(new ApiResponse(200, sections, 'sections fetch successfully'));
});

const getSectionController = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  if (!sectionId || !mongoose.isValidObjectId(sectionId as string)) {
    throw new ApiError(400, 'Invalid section id');
  }
  const section = await Section.findOne({ _id: sectionId, isDeleted: false }).lean();
  if (!section) throw new ApiError(404, 'section not found');
  res.status(200).json(new ApiResponse(200, section, 'section fetch successfully'));
});

export {
  createSectionController,
  deleteSectionController,
  getSectionOfCourseController,
  getSectionController,
};
