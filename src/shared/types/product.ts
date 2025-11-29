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

export interface ProdcutCard {
  list: ProductInfo[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface ProductRequest {
  'member-id': number;
  page: number;
  size: number;
}

export interface ProductResponse extends ApiResponse {
  result: ProdcutCard
}

export interface ProductPromptRequest {
  'member-id': number;
  prompt: string;
  page: number;
  size: number;
}

export interface ProductPrompt {

}

export interface ProductDetailRequest {
  id: number;
}

export interface ProductOption {
  id: number;
  name: string;
  imageUrl: string;
  optionNo: string;
}

export interface ProductDetail{
  id: number;
  name: string;
  brand: string;
  rating: number;
  price: number;
  originUrl: string;
  imageUrl: string;
  reviewCountAll: number;
  reviewCountOne: number;
  reviewCountTwo: number;
  reviewCountThree: number;
  reviewCountFour: number;
  reviewCountFive: number;
  options: ProductOption[];
}

export interface ProductDetailResponse  extends ApiResponse {
  result: ProductDetail;
}


export interface ProductReview {
  id: number;
  rating: number;
  likes: number;
  content: string;
  userName: string;
  userDescription: string;
  userImage: string;
  createdAt: number;
}

export interface ProductReviewRequest {
  id: number;
}

export interface ProductReviewResponse  extends ApiResponse {
  result: ProductReview[];
}