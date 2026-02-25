import type { ApiResponse } from "../../../shared/types/ApiResponse";

export interface Course {
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  isPublished: boolean;
  accessType: 'FREE' | 'PAID';
  isDeleted: boolean;
  _id: string;
}

export type CreateCourseResponse = ApiResponse<Course>;