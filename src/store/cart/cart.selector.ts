import { createSelector } from 'reselect';

import type { RootState } from '../store';
import type { CartGuitar } from '../../types/guitar';
import type { CartProduct } from '../../types/cart';

export const selectGuitarsFromCart = (state: RootState): Record<number, CartProduct> =>
  state.CART.data;
export const selectTotalCartPrice = (state: RootState): number => state.CART.totalCartPrice;
export const selectCartItemsQuantity = (state: RootState): number => state.CART.itemsQuantity;
export const selectDiscountValue = (state: RootState): number => state.CART.discount;
export const selectTotalCartPriceWithDiscount = (state: RootState): number =>
  state.CART.totalCartPriceWithDiscount;
export const selectOrderedGuitarsIds = (state: RootState): number[] =>
  Object.keys(state.CART.data).map((id) => +id);
export const selectCoupon = (state: RootState): string | null => state.CART.coupon;

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
  // если продукта с переданным id нет, вернет 0
  (guitars, id): number => (guitars[id] ? guitars[id].totalPrice : 0),
);

export const quantityProductByIdSelector = createSelector(
  [selectGuitarsFromCart, (_state: RootState, productId: number) => productId],
  // если продукта с переданным id нет, вернет 0
  (guitars, id) => (guitars[id] ? guitars[id].quantity : 0),
);
