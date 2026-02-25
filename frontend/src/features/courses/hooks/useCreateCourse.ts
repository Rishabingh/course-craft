import { protectedInstance } from '../../../shared/lib/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CourseInput } from '../schemas/CourseInputSchema';
import type { CreateCourseResponse } from '../types/CreateCourseResponse';
import toast from 'react-hot-toast';

const uploadCourse = async (form: CourseInput) => {
  try {
    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', String(form.price));
    formData.append('accessType', form.accessType);
    formData.append('isPublished', String(form.isPublished));

    if (form.image) {
      formData.append('image', form.image);
    }

    const res = await protectedInstance.post<CreateCourseResponse>(
      '/course',
      formData
    );

    console.log("SUCCESS RESPONSE:", res);

    return res.data;
  } catch (err: any) {
    console.log("UPLOAD ERROR FULL:", err);
    console.log("UPLOAD ERROR RESPONSE:", err.response);
    throw err;
  }
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadCourse,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error: any) => {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || 'failed to create course');
    },
  });
};
