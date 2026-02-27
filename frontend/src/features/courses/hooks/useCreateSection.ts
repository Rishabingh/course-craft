import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedInstance } from "../../../shared/lib/axiosInstance";
import toast from "react-hot-toast";

interface SectionInput {
  course: string;
  name: string;
  index: number;
}

const createSection = async (data: SectionInput) => {
  const res = await protectedInstance.post('/section', data);
  return res.data.data;
}

export const useCreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSection,
    onError: () => {
      toast.error('something went wrong');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['sections']});
      toast.success('section created successfully')
    }
  });
}