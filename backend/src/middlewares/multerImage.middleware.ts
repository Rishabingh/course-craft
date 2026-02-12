import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import type { FileFilterCallback } from 'multer';
import type { Request } from 'express';
import { ApiError } from '../utils/ApiError.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads', 'tmp'));
  },

  filename: (req, file, cb) => {
    const mime = path.extname(file.originalname);
    const mediaName = `${crypto.randomBytes(16).toString('hex')}${mime}`;
    cb(null, mediaName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'invalid file type'));
  }
};

const upload = multer({
  storage,
  limits: { files: 1, fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

export const multerImageUpload = upload.single('image');
