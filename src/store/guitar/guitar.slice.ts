import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGuitarsWithParams } from './guitar.async';
import { FetchDataStatus } from '../../constants';

import type { Guitar } from '../../types/guitar';

export type GuitarSliceState = {
  items: Guitar[] | [];
  status: FetchDataStatus;
  guitarsTotalCount: number;
};

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
      .addCase(fetchGuitarsWithParams.pending, (state) => {
        state.status = FetchDataStatus.Idle;
      })
      .addCase(fetchGuitarsWithParams.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = FetchDataStatus.Success;
      })
      .addCase(fetchGuitarsWithParams.rejected, (state) => {
        state.status = FetchDataStatus.Failed;
      })
      .addDefaultCase((state) => state);
  },
});

export const { setGuitarsCount } = guitarSlice.actions;
export default guitarSlice.reducer;
