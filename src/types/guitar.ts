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
};

export type GuitarWithReviews = Guitar & {
  comments: GuitarReview[];
};
