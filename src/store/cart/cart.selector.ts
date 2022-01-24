import { createSelector } from 'reselect';

import type { RootState } from '../store';
import type { CartGuitar } from '../../types/guitar';
import type { CartProduct } from '../../types/cart';

export const selectGuitarsFromCart = (state: RootState): Record<number, CartProduct> =>
  state.CART.data;
export const selectTotalCartPrice = (state: RootState): number => state.CART.totalCartPrice;
export const selectCartItemsQuantity = (state: RootState): number => state.CART.itemsQuantity;

// selectors
export const guitarIsCartByIdSelector = createSelector(
  [selectGuitarsFromCart, (_state: RootState, id: number) => id],
  (guitars, id): boolean => !!guitars[id],
);

export const serializedCartProductsSelector = createSelector(
  selectGuitarsFromCart,
  (products): CartGuitar[] => Object.keys(products).map((key) => products[+key].product),
);

export const totalPriceProductByIdSelector = createSelector(
  [selectGuitarsFromCart, (_state: RootState, productId: number) => productId],
  (guitars, id) => guitars[id].totalPrice,
);

export const quantityProductByIdSelector = createSelector(
  [selectGuitarsFromCart, (_state: RootState, productId: number) => productId],
  (guitars, id) => guitars[id].quantity,
);

//
// export const totalCartProductsSelector = createSelector(selectCartData, (cartData): number => {
//   const cartCategories = Object.entries(cartData).map(([_key, value]) => value);
//   const productsCount = cartCategories.map((category) =>
//     getTotalCartSum(category, 'items.length'),
//   );
//
//   return productsCount.reduce((acc, count) => acc + count, 0);
// });
