import { createSelector } from 'reselect';

import type { Guitar } from '../../types/guitar';
import type { GuitarReview } from '../../types/review';
import { sortReviewsByDateFromNewToOld } from '../../utils/date';
import type { RootState } from '../store';

export const selectGuitarProduct = (state: RootState): Guitar | null => state.PRODUCT.data;
export const selectGuitarReviews = (state: RootState): GuitarReview[] => state.PRODUCT.reviews.data;
export const selectGuitarProductName = (state: RootState): string | null =>
  state.PRODUCT.data && state.PRODUCT.data.name;

export const guitarsReviewsSelector = createSelector(selectGuitarReviews, (reviews) =>
  [...reviews].sort(sortReviewsByDateFromNewToOld),
);
