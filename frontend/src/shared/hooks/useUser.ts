import { useQuery } from '@tanstack/react-query';
import { protectedInstance } from '../lib/axiosInstance';
import type { MeResponse } from '../types/MeResponse';
import { useTokenStore } from '../../store';

const fetchUser = async () => {
  const res = await protectedInstance.get<MeResponse>('/users/me');
  return res.data.data;
};

export const useUser = () => {
  const token = useTokenStore((state) => state.accessToken);
  console.log(token);
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
};
