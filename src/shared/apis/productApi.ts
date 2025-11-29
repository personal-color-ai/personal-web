import {instance} from '@apis/axiosinstance';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ProductRequest, ProductResponse, ProductDetailRequest, ProductDetailResponse,ProductReviewRequest, ProductReviewResponse, ProductPromptRequest} from '@types/product';

export const productApi = {
  getProductList: async (params: ProductRequest) => {
    const res = await instance.get<ProductResponse>(
      '/products',{
        params
      }
    )
    return res.data;
  },

  getProductDetail: async (params: ProductDetailRequest) => {
    const res = await instance.get<ProductDetailResponse>(`/products/${params.id}`);
    return res.data;
  },

  getProductReview: async (params: ProductReviewRequest) => {
    const res = await instance.get<ProductReviewResponse>(`/products/${params.id}/reviews`);
    return res.data;
  },

  getPromptProduct: async (params: ProductPromptRequest ) => {
    const res = await instance.get<ProductResponse>('/em', {
      params
    })
    return res.data;
  }
}