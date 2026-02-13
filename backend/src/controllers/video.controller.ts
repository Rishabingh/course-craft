import { VideoInput } from '../schemas/vidoe.schema.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { cloudinaryUpload } from '../services/cloudinaryUpload.js';
import { Video } from '../models/Video.models.js';
import mongoose from 'mongoose';
import { Section } from '../models/Section.models.js';

interface MulterFiles {
  thumbnail?: Express.Multer.File[];
  video?: Express.Multer.File[];
}

const createVideoController = asyncHandler(async (req, res) => {
  const { title, section, index } = req.body as VideoInput;
  const files = req.files as MulterFiles;

  if (!mongoose.isValidObjectId(section)) {
    throw new ApiError(400, 'Invalid section id');
  }

  const sectionExists = await Section.findOne({
    _id: section,
    isDeleted: false,
  });

  if (!sectionExists) {
    throw new ApiError(404, 'Section not found');
  }

  const thumbnail = files.thumbnail?.[0];
  const video = files.video?.[0];

  if (!thumbnail || !video) throw new ApiError(400, 'video and thumbnail must be send');

  const [thumbnailRes, videoRes] = await Promise.all([
    cloudinaryUpload(thumbnail.path),
    cloudinaryUpload(video.path),
  ]);

  if (!thumbnailRes || !videoRes) throw new ApiError(500, 'media upload failed');

  const thumbnailUrl = thumbnailRes.secure_url;
  const videoUrl = videoRes.secure_url;

  const videoDocument = await Video.create({
    title,
    thumbnail: thumbnailUrl,
    videoUrl,
    index,
    section,
  });

  res.status(201).json(new ApiResponse(201, { videoDocument }, 'video created successfully'));
});

const deleteVideoController = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) throw new ApiError(400, 'bad request');

  if (!mongoose.isValidObjectId(videoId)) throw new ApiError(400, 'invalid id');

  const video = await Video.findByIdAndUpdate(videoId, { isDeleted: true }, { new: true });

  if (!video) throw new ApiError(404, 'Video not found');

  res.status(200).json(new ApiResponse(200, video, 'deleted successfully'));
});

const getVideoOfSectionController = asyncHandler(async (req, res) => {
  const section = req.query.section;
  if (!section || !mongoose.isValidObjectId(section as string)) {
    throw new ApiError(400, 'Invalid section id');
  }

  if (!section) throw new ApiError(400, 'section query cannot be empty');

  const videos = await Video.find({ section, isDeleted: false }).sort({ index: 1 }).lean();
  res.status(200).json(new ApiResponse(200, videos, 'videos fetch successfully'));
});

const getVideoController = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId || !mongoose.isValidObjectId(videoId as string)) {
    throw new ApiError(400, 'Invalid section id');
  }
  const video = await Video.findOne({ _id: videoId, isDeleted: false }).lean();
  if (!video) throw new ApiError(404, 'video not found');
  res.status(200).json(new ApiResponse(200, video, 'video fetch successfully'));
});

export {
  createVideoController,
  deleteVideoController,
  getVideoOfSectionController,
  getVideoController,
};
