import { createSlice } from '@reduxjs/toolkit';

import { FetchDataStatus } from '../../constants';
import { fetchProductById, postReview } from './product.async';

import type { ProductSliceState } from '../../types/state';

const initialState: ProductSliceState = {
  data: null,
  status: FetchDataStatus.Idle,
  reviews: {
    data: [],
    status: FetchDataStatus.Idle,
  },
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
        state.reviews.data = comments;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = FetchDataStatus.Failed;
        state.data = null;
        state.reviews.data = [];
      })
      .addCase(postReview.pending, (state) => {
        state.reviews.status = FetchDataStatus.Idle;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.status = FetchDataStatus.Success;
        state.reviews.data.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.reviews.status = FetchDataStatus.Failed;
      })
      .addDefaultCase((state) => state);
  },
});

export default ProductSlice.reducer;
