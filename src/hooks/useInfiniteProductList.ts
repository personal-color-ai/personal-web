import { useInfiniteQuery } from '@tanstack/react-query';
import { productApi } from '@apis/productApi';
import { ProductRequest } from '@types/product';

export const useInfiniteProductList = (params: ProductRequest) => {
  return useInfiniteQuery({
    queryKey: ['productList', params.memberId],
    initialPageParam: 0,
    queryFn: async ({pageParam = 0}) => {
      return await productApi.getProductList({
        ...params,
        page: pageParam
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length - 1;
      if (lastPage.isLast) return undefined;
      return currentPage + 1;
    },
  });
};
