import { createSlice } from '@reduxjs/toolkit';

import { FetchDataStatus } from '../../constants';
import { fetchProductById } from './product.async';

import type { ProductSliceState } from '../../types/state';

const initialState: ProductSliceState = {
  data: null,
  status: FetchDataStatus.Idle,
  reviews: [],
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = FetchDataStatus.Idle;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const { comments, ...product } = action.payload;

        state.status = FetchDataStatus.Success;
        state.data = product;
        state.reviews = comments;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = FetchDataStatus.Failed;
        state.data = null;
        state.reviews = [];
      })
      .addDefaultCase((state) => state);
  },
});

export default ProductSlice.reducer;
