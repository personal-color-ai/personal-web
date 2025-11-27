import { useInfiniteQuery } from '@tanstack/react-query';
import { productApi } from '@apis/productApi';

export const useInfiniteProductList = (params: { 'member-id': number; size: number }) => {
  return useInfiniteQuery({
    queryKey: ['productList', params['member-id']],
    initialPageParam: 0,
    queryFn: async ({pageParam = 0}) => {
      return await productApi.getProductList({
        ...params,
        page: pageParam
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.isLast) return undefined;
      return allPages.length;
    },
  });
};
