import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

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

// defining routes

// global error config
app.use();

export { app };
