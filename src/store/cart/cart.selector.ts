import { createSelector } from 'reselect';

import { getTotalCartSum } from '../../utils/cart';

import type { RootState } from '../store';
import type { CartCategory, CartProduct } from '../../types/cart';

export const selectGuitarCart = (state: RootState): CartCategory => state.CART.data.guitars;

export const selectTotalCartPrice = (state: RootState): number => state.CART.totalCartPrice;

export const selectTotalCartProducts = (state: RootState) =>
  getTotalCartSum(state.CART.data, 'items.length');

export const guitarFromCartByIdSelector = createSelector(
  [selectGuitarCart, (_state: RootState, id: number) => id],
  (guitars, id): boolean => !!guitars[id],
);

export const serializedCartProductsSelector = createSelector(
  selectGuitarCart,
  (products): CartProduct[] => Object.keys(products).map((key) => products[+key].items[0]),
);
