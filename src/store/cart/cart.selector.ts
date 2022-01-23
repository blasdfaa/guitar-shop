import { createSelector } from 'reselect';

import { getTotalCartSum } from '../../utils/cart';

import type { RootState } from '../store';
import type { CartCategory, CartProduct } from '../../types/cart';

const selectCartData = (state: RootState): Record<string, CartCategory> => state.CART.data;
export const selectGuitarCart = (state: RootState): CartCategory => state.CART.data.guitars;
export const selectTotalCartPrice = (state: RootState): number => state.CART.totalCartPrice;

// selectors
export const guitarFromCartByIdSelector = createSelector(
  [selectGuitarCart, (_state: RootState, id: number) => id],
  (guitars, id): boolean => !!guitars[id],
);

export const serializedCartProductsSelector = createSelector(
  selectGuitarCart,
  (products): CartProduct[] => Object.keys(products).map((key) => products[+key].items[0]),
);

export const totalCartProductsSelector = createSelector(selectCartData, (cartData): number => {
  const cartCategories = Object.entries(cartData).map(([_key, value]) => value);
  const productsCount = cartCategories.map((category) =>
    getTotalCartSum(category, 'items.length'),
  );

  return productsCount.reduce((acc, count) => acc + count, 0);
});
