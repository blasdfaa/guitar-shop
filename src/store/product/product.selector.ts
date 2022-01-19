import { createSelector } from 'reselect';

import { FetchDataStatus } from '../../constants';
import { sortReviewsByDateFromNewToOld } from '../../utils/date';

import type { GuitarWithoutReviews } from '../../types/guitar';
import type { GuitarReview } from '../../types/review';
import type { RootState } from '../store';

export const selectGuitarProduct = (state: RootState): GuitarWithoutReviews | null => state.PRODUCT.data;
export const selectGuitarReviews = (state: RootState): GuitarReview[] => state.PRODUCT.reviews.data;
export const selectGuitarProductName = (state: RootState): string | null =>
  state.PRODUCT.data && state.PRODUCT.data.name;
export const selectProductLoadingStatus = (state: RootState): FetchDataStatus => state.PRODUCT.status;

export const guitarsReviewsSelector = createSelector(selectGuitarReviews, (reviews) =>
  [...reviews].sort(sortReviewsByDateFromNewToOld),
);
