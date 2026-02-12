import multer from 'multer';
import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { ApiError } from '../utils/ApiError.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads', 'tmp'));
  },

  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const prefix = crypto.randomBytes(16).toString('hex');
    const filename = `${prefix}${extName}`;
    cb(null, filename);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'file should only be image and video'));
  }
};

const upload = multer({
  storage,
  limits: { files: 2, fileSize: 50 * 1024 * 1024 },
  fileFilter,
});

export const multerImageVideoUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);
