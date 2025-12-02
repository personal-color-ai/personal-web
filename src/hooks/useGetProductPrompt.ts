import {useInfiniteQuery} from '@tanstack/react-query';
import { productApi } from '@apis/productApi';

export const useGetProductPrompt = (params: { 'member-id': number; prompt:string; size: number }) => {
  return useInfiniteQuery({
    queryKey: ['promptList', params['member-id']],
    initialPageParam: 0,
    queryFn: async ({pageParam = 0}) => {
      return await productApi.getPromptProduct({
        ...params,
        page: pageParam
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.isLast) return undefined;
      return allPages.length;
    },
    enabled: false,
    retry: false,
  })
}