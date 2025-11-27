import { useQuery } from '@tanstack/react-query';
import { productApi } from '@apis/productApi';

export const useGetProductReview = (productId: number) => {
  return useQuery({
    queryKey: ['productReview', productId],
    queryFn: () => productApi.getProductReview({id: productId}),
  })
};