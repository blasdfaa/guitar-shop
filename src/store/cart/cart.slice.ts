import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchDataStatus } from '../../constants';

import type { CartSliceState } from '../../types/state';
import type { CartProduct } from '../../types/cart';

const initialState: CartSliceState = {
  data: {
    guitars: {},
  },
  status: FetchDataStatus.Idle,
  totalCartPrice: 0,
  itemsQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const newProducts = {
        items: [product],
        totalPrice: product.price,
      };

      state.data.guitars[product.id] = newProducts;
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      delete state.data.guitars[productId];
    },
  },
  extraReducers: {},
});

const { reducer, actions } = cartSlice;

export const { addProductToCart, removeProductFromCart } = actions;
export default reducer;
