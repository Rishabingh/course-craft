import { useQuery } from "@tanstack/react-query";
import { protectedInstance } from "../lib/axiosInstance";
import type { MeResponse } from "../types/MeResponse";
import { useTokenStore } from "../../store";

export const useUser = () => {
  const token = useTokenStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const res = await protectedInstance.get<MeResponse>('/users/me');
      return res.data.data;
    },
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
};