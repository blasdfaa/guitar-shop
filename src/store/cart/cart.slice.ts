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
      const newProduct = action.payload;

      state.data.guitars[newProduct.id] = {
        items: [newProduct],
        totalPrice: newProduct.price,
      };
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const newProductId = action.payload;

      delete state.data.guitars[newProductId];
    },
    increaseProductQuantity: (state) => state,
    decreaseProductQuantity: (state) => state,
  },
  extraReducers: {},
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
