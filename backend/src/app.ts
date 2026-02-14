import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

// basic express configuration

if (!process.env.ORIGINS) {
  throw new Error('origin environment variable is empty, app will not run without it');
}

const origins = process.env.ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origins,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.join(process.cwd(), 'public')));

// importing routes
import healthCheckRouter from './routes/healthCheck.route.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import statsRouter from './routes/stats.routes.js';
import courseRouter from './routes/course.routes.js';
import sectionRouter from './routes/section.routes.js';
import videoRouter from './routes/video.routes.js';

// defining routes
app.use('/health', healthCheckRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stats', statsRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/section', sectionRouter);
app.use('/api/v1/video', videoRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Course Platform API',
    version: 'v1',
    status: 'running',
    docs: '/docs',
    health: '/health',
    timestamp: new Date().toISOString(),
  });
});

// global error config
app.use(errorMiddleware);

export { app };
