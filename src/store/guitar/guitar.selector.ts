import { createSelector } from 'reselect';

import { RootState } from '../store';

import type { FetchDataStatus } from '../../constants';
import type { Guitar } from '../../types/guitar';

export type calculatedPrice = {
  calculatedMinPrice: number;
  calculatedMaxPrice: number;
};

export const selectGuitarsLoadingStatus = (state: RootState): FetchDataStatus => state.GUITARS.status;
export const selectGuitarsItems = (state: RootState): Guitar[] => state.GUITARS.items;
export const selectGuitarsTotalCount = (state: RootState): number => state.GUITARS.guitarsTotalCount;

export const calculatedGuitarPriceSelector = createSelector(
  selectGuitarsItems,
  (items): calculatedPrice => ({
    calculatedMinPrice: items?.length ? Math.min(...items.map((guitar) => guitar.price)) : 0,
    calculatedMaxPrice: items?.length ? Math.max(...items.map((guitar) => guitar.price)) : 0,
  }),
);
