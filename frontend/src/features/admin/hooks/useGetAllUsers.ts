import { useInfiniteQuery } from '@tanstack/react-query';
import { protectedInstance } from '../../../shared/lib/axiosInstance';
import type { AllUserApiResponse } from '../types/AllUserApiResponse';

interface UsersQueryParams {
  status?: 'active' | 'blocked' | 'deleted';
  search?: string;
}

export const useGetAllUsers = (params: UsersQueryParams) => {
  return useInfiniteQuery({
    queryKey: ['users', params],
    queryFn: async ({ pageParam = null }: { pageParam: string | null }) => {
      const res = await protectedInstance.get<AllUserApiResponse>('/users', {
        params: {
          limit: 10,
          lastCursor: pageParam,
          status: params.status,
          search: params.search,
        },
      });
      return res.data.data;
    },
    initialPageParam: null,

    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.hasMore) return undefined;
      return lastPage.pagination.nextCursor;
    },
  });
};
