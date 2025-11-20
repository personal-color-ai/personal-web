import {instance} from '@apis/axiosinstance';
import { ProductRequest, ProductResponse } from '@types/product';

export const productApi = {
  getProductList: async (params: ProductRequest) => {
    const res = await instance.get<ProductResponse>(
      '/products',{
        params
      }
    )
    return res.data;
  }
}