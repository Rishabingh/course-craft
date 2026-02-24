import type { ApiResponse } from "../../../shared/types/ApiResponse";

export interface ApiUsers {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';

  authProvider: 'local' | 'google';

  emailVerified: boolean;
  deletedAt: Date | null;
  isBlocked: boolean;

  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  hasMore: boolean;
  nextCursor: string | null;
}

export type AllUserApiResponse = ApiResponse<{users: ApiUsers[], pagination: Pagination}>;