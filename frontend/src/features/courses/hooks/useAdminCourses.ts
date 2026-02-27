import { useQuery } from '@tanstack/react-query';
import { protectedInstance } from '../../../shared/lib/axiosInstance';
import type { MyCoursesResponse } from '../types/MyCourseResponses';

const fetchCourses = async () => {
  try {
    const res = await protectedInstance.get<MyCoursesResponse>('/course/admin');
    console.log(res)
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const useAdminCourses = () => {
  return useQuery({
    queryKey: ['adminCourses'],
    queryFn: fetchCourses,
    //staleTime: 5 * 60 * 1000,
    initialData: [],
  });
};