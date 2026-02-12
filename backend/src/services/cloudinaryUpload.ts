import cloudinary from '../config/cloudinaryConfig.js';
import { ApiError } from '../utils/ApiError.js';
import fs from 'fs/promises';

export const cloudinaryUpload = async (filePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'media upload failed');
  } finally {
    try {
      if (filePath) await fs.unlink(filePath);
    } catch (err) {
      console.warn('Temp file cleanup failed:', err);
    }
  }
};
