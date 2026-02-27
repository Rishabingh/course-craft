import type { Course } from "./CreateCourseResponse";
import type { ApiResponse } from "../../../shared/types/ApiResponse";

export type MyCoursesResponse = ApiResponse<Course[]>;