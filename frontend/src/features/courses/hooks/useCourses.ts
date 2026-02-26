import { useQuery } from '@tanstack/react-query';
import { protectedInstance } from '../../../shared/lib/axiosInstance';
import type { MyCourseResponse } from '../types/MyCourseResponse';

const fetchCourses = async () => {
  try {
    const res = await protectedInstance.get<MyCourseResponse>('/course/');
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCourses = () => {
  return useQuery({
    queryKey: ['myCourse'],
    queryFn: fetchCourses,
    //staleTime: 5 * 60 * 1000,
    initialData: [],
  });
};
