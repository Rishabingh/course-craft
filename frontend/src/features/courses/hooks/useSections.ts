import { protectedInstance } from "../../../shared/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import type { SectionsResponse } from "../types/SectionsResponse";
import type { QueryFunctionContext } from "@tanstack/react-query";

const fetchSections = async (context: QueryFunctionContext<[string, string]>) => {
  const [, id] = context.queryKey;
  const res = await protectedInstance.get<SectionsResponse>('/section/', {
    params: {
      course: id,
    }
  })
  return res.data.data
}

export const useSections = (id: string) => {
  return useQuery({
    queryKey: ['sections', id],
    queryFn: fetchSections,
    initialData: [],
    //staletime
  })
}