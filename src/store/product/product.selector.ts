import type { Guitar } from '../../types/guitar';
import type { GuitarReview } from '../../types/review';
import type { RootState } from '../store';

export const selectGuitarProduct = (state: RootState): Guitar | null => state.PRODUCT.data;
export const selectGuitarReviews = (state: RootState): GuitarReview[] => state.PRODUCT.reviews;
export const selectGuitarProductName = (state: RootState): string | null =>
  state.PRODUCT.data && state.PRODUCT.data.name;
