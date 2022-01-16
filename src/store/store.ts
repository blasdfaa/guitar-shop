import { configureStore } from '@reduxjs/toolkit';

import guitarReducer from './guitar/guitar.slice';
import searchReducer from './search/search.slice';
import productReducer from './product/product.slice';

const reducer = {
  GUITARS: guitarReducer,
  SEARCH: searchReducer,
  PRODUCT: productReducer,
};

const store = configureStore({
  reducer,
});

export const getStoreWithState = (preloadedState?: RootState) => configureStore({ reducer, preloadedState });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
