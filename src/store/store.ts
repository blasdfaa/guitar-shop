import { configureStore } from '@reduxjs/toolkit';

import guitarReducer from './guitar/guitar.slice';
import searchReducer from './search/search.slice';
import productReducer from './product/product.slice';
import cartReducer from './cart/cart.slice';

const reducer = {
  GUITARS: guitarReducer,
  SEARCH: searchReducer,
  PRODUCT: productReducer,
  CART: cartReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

export const getStoreWithState = (preloadedState?: RootState) =>
  configureStore({ reducer, preloadedState });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
