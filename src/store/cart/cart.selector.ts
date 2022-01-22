import { createSelector } from 'reselect';

import type { RootState } from '../store';
import type { CartProduct } from '../../types/guitar';

export const selectGuitarCart = (state: RootState): Record<number, { items: CartProduct[] }> =>
  state.CART.data.guitars;

export const selectTotalCartPrice = (state: RootState) => state.CART.totalCartPrice;

export const guitarFromCartByIdSelector = createSelector(
  [selectGuitarCart, (_state: RootState, id: number) => id],
  (guitars, id): boolean => !!guitars[id],
);

export const serializedCartProductsSelector = createSelector(selectGuitarCart, (products) =>
  Object.keys(products).map((key) => products[+key].items[0]),
);
