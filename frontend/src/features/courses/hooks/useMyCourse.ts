import { useQuery } from "@tanstack/react-query";
import { protectedInstance } from "../../../shared/lib/axiosInstance";
import type { MyCourseResponse } from "../types/MyCourseResponses";

const fetchMyCourse = async () => {
  const res = await protectedInstance.get<MyCourseResponse>('/me/courses');
  return res.data.data;
};

export const useMyCourse = () => {
  return useQuery({
    queryKey: ['myCourse'],
    queryFn: fetchMyCourse,
    staleTime: 5 * 60 * 1000,
    initialData: [],
  })
}