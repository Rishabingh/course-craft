import type { IUser } from './User.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export {};
