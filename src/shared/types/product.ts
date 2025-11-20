import { ApiResponse } from '@types/api';

export interface ProductInfo {
  id: number;
  name: string;
  brand: string;
  rating: number;
  imageUrl: string;
}
export interface ProductRequest {
  memberId: number;
  page: number;
  size: number;
}

export interface ProductResponse extends ApiResponse {
  result: ProductInfo[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}