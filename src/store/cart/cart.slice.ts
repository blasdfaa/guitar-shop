import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchDataStatus } from '../../constants';
import { getTotalSumOfAllProducts } from '../../utils/cart';
import { postPromocodeDiscount } from './cart.async';

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
  discountPercent: 0,
  discount: 0,
  totalCartPrice: 0,
  totalCartPriceWithDiscount: 0,
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

      state.discount = state.discountPercent
        ? (state.totalCartPrice * state.discountPercent) / 100
        : state.discountPercent;
      state.totalCartPriceWithDiscount = state.discount
        ? state.totalCartPrice - state.discount
        : state.totalCartPrice;
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const currentProductId = action.payload;

      state.totalCartPrice -= state.data[currentProductId].totalPrice;
      state.itemsQuantity -= state.data[currentProductId].quantity;

      delete state.data[currentProductId];

      state.discount = state.discountPercent
        ? (state.totalCartPrice * state.discountPercent) / 100
        : state.discountPercent;
      state.totalCartPriceWithDiscount = state.discount
        ? state.totalCartPrice - state.discount
        : state.totalCartPrice;
    },
    increaseProductQuantity: (state, action: PayloadAction<number>) => {
      const currentProductId = action.payload;
      const currentProduct = state.data[currentProductId];
      const currentProductPrice = currentProduct.product.price;

      currentProduct.quantity += INCREASE_PRODUCT_QUANTITY;
      currentProduct.totalPrice += currentProductPrice;

      state.itemsQuantity += INCREASE_PRODUCT_QUANTITY;
      state.totalCartPrice += currentProductPrice;

      state.discount = state.discountPercent
        ? (state.totalCartPrice * state.discountPercent) / 100
        : state.discountPercent;
      state.totalCartPriceWithDiscount = state.discount
        ? state.totalCartPrice - state.discount
        : state.totalCartPrice;
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

        state.discount = state.discountPercent
          ? (state.totalCartPrice * state.discountPercent) / 100
          : state.discountPercent;
        state.totalCartPriceWithDiscount = state.discount
          ? state.totalCartPrice - state.discount
          : state.totalCartPrice;
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

      state.discount = state.discountPercent
        ? (state.totalCartPrice * state.discountPercent) / 100
        : state.discountPercent;
      state.totalCartPriceWithDiscount = state.discount
        ? state.totalCartPrice - state.discount
        : state.totalCartPrice;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(postPromocodeDiscount.fulfilled, (state, action) => {
      const discountPercent = action.payload;

      state.discountPercent = discountPercent;
      state.discount = (state.totalCartPrice * discountPercent) / 100;
      state.totalCartPriceWithDiscount = state.totalCartPrice - state.discount;
    }),
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  addQuantityItem,
} = cartSlice.actions;
export default cartSlice.reducer;
