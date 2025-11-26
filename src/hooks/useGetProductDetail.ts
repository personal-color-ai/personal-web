import { useQuery } from '@tanstack/react-query';
import { productApi } from '@apis/productApi';

export const useGetProductDetail = (productId: number) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => productApi.getProductDetail({ id: productId })
  });
};
