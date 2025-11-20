// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ApiResponse } from '@types/api';

export interface ProductInfo {
  id: number;
  name: string;
  brand: string;
  rating: number;
  imageUrl: string;
}
export interface ProductRequest {
  'member-id': number;
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