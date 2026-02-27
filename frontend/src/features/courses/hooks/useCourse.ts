import { useQuery } from '@tanstack/react-query';
import { protectedInstance } from '../../../shared/lib/axiosInstance';
import type { CourseResponse } from '../types/CourseResponse';
import type { QueryFunctionContext } from '@tanstack/react-query';

const fetchCourse = async (context: QueryFunctionContext<[string, string]>) => {
  try {
    const [, id] = context.queryKey;
    const res = await protectedInstance.get<CourseResponse>(`/course/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: fetchCourse,
    //staleTime: 5 * 60 * 1000,
  });
};