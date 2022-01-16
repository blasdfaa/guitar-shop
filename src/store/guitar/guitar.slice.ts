import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGuitarsWithParams } from './guitar.async';
import { FetchDataStatus } from '../../constants';

import type { GuitarSliceState } from '../../types/state';

const initialState: GuitarSliceState = {
  items: [],
  status: FetchDataStatus.Idle,
  guitarsTotalCount: 0,
};

const guitarSlice = createSlice({
  name: 'guitar',
  initialState,
  reducers: {
    setGuitarsCount: (state, action: PayloadAction<number>) => {
      state.guitarsTotalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitarsWithParams.pending, (state, action) => {
        state.status = FetchDataStatus.Idle;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchGuitarsWithParams.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.currentRequestId === requestId) {
          state.items = action.payload;
          state.status = FetchDataStatus.Success;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchGuitarsWithParams.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.currentRequestId === requestId) {
          state.status = FetchDataStatus.Failed;
          state.currentRequestId = undefined;
        }
      })
      .addDefaultCase((state) => state);
  },
});

export const { setGuitarsCount } = guitarSlice.actions;
export default guitarSlice.reducer;
