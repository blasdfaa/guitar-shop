import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchDataStatus } from '../../constants';
import { getTotalSumOfAllProducts } from '../../utils/cart';

import type { CartSliceState } from '../../types/state';
import type { CartGuitar } from '../../types/guitar';

type AddQuantityItemPayload = {
  productId: number;
  value: number;
};

const INCREASE_PRODUCT_QUANTITY = 1;
const DECREASE_PRODUCT_QUANTITY = 1;

const initialState: CartSliceState = {
  data: {},
  status: FetchDataStatus.Idle,
  totalCartPrice: 0,
  itemsQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartGuitar>) => {
      const newProduct = action.payload;

      state.data[newProduct.id] = {
        product: newProduct,
        totalPrice: newProduct.price,
        quantity: INCREASE_PRODUCT_QUANTITY,
      };

      state.totalCartPrice += newProduct.price;
      state.itemsQuantity += INCREASE_PRODUCT_QUANTITY;
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const currentProductId = action.payload;

      state.totalCartPrice -= state.data[currentProductId].totalPrice;
      state.itemsQuantity -= state.data[currentProductId].quantity;

      delete state.data[currentProductId];
    },
    increaseProductQuantity: (state, action: PayloadAction<number>) => {
      const currentProductId = action.payload;
      const currentProduct = state.data[currentProductId];
      const currentProductPrice = currentProduct.product.price;

      currentProduct.quantity += INCREASE_PRODUCT_QUANTITY;
      currentProduct.totalPrice += currentProductPrice;

      state.itemsQuantity += INCREASE_PRODUCT_QUANTITY;
      state.totalCartPrice += currentProductPrice;
    },
    decreaseProductQuantity: (state, action: PayloadAction<number>) => {
      const currentProductId = action.payload;
      const currentProduct = state.data[currentProductId];
      const currentProductPrice = currentProduct.product.price;

      if (currentProduct.quantity > 1) {
        currentProduct.quantity -= DECREASE_PRODUCT_QUANTITY;
        currentProduct.totalPrice -= currentProductPrice;

        state.itemsQuantity -= DECREASE_PRODUCT_QUANTITY;
        state.totalCartPrice -= currentProductPrice;
      }
    },
    addQuantityItem: (state, action: PayloadAction<AddQuantityItemPayload>) => {
      const currentProductId = action.payload.productId;
      const currentProduct = state.data[currentProductId];
      const currentProductPrice = currentProduct.product.price;
      const newQuantity = action.payload.value;

      currentProduct.quantity = newQuantity;
      currentProduct.totalPrice = currentProductPrice * newQuantity;

      const quantityOfAllProducts = getTotalSumOfAllProducts(state.data, 'quantity');
      const totalPriceOfAllProducts = getTotalSumOfAllProducts(state.data, 'totalPrice');

      state.itemsQuantity = quantityOfAllProducts;
      state.totalCartPrice = totalPriceOfAllProducts;
    },
  },
  extraReducers: {},
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  addQuantityItem,
} = cartSlice.actions;
export default cartSlice.reducer;
