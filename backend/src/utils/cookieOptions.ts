import { CookieOptions } from 'express';

export const refreshTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
});
