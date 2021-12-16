import { combineReducers, configureStore } from '@reduxjs/toolkit';

import guitarApi from './guitar/guitar.api';
import searchedGuitarReducer from './searched-guitar/searched-guitar.slice';

const rootReducer = combineReducers({
  [guitarApi.reducerPath]: guitarApi.reducer,
  SEARCHED_GUITAR: searchedGuitarReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(guitarApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
