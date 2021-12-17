import { combineReducers, configureStore } from '@reduxjs/toolkit';

import guitarApi from './guitar/guitar.api';
import searchedGuitarReducer from './searched-guitar/searched-guitar.slice';
import catalogReducer from './catalog/catalog.slice';

const rootReducer = combineReducers({
  SEARCHED_GUITAR: searchedGuitarReducer,
  CATALOG_PAGE: catalogReducer,
  [guitarApi.reducerPath]: guitarApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(guitarApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
