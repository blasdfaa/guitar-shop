import type { GuitarReview } from './review';

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments: GuitarReview[];
};

export type GuitarWithoutReviews = Omit<Guitar, 'comments'>;

export type ProductInfoTab = Partial<
  Pick<Guitar, 'vendorCode' | 'type' | 'stringCount' | 'description'>
>;

export type CartProduct = Omit<Guitar, 'rating' | 'comments' | 'description'> & {
  totalPrice?: number;
};
