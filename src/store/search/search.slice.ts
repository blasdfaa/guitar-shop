import { createSlice } from '@reduxjs/toolkit';

import { FetchDataStatus } from '../../constants';
import { fetchGuitarsByName } from './search.async';

import type { Guitar } from '../../types/guitar';

export type SearchSliceState = {
  guitars: {
    data: Guitar[] | [];
    status: FetchDataStatus;
  };
};

const initialState: SearchSliceState = {
  guitars: {
    data: [],
    status: FetchDataStatus.Idle,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitarsByName.pending, (state) => {
        state.guitars.status = FetchDataStatus.Idle;
        state.guitars.data = [];
      })
      .addCase(fetchGuitarsByName.fulfilled, (state, action) => {
        state.guitars.status = FetchDataStatus.Success;
        state.guitars.data = action.payload;
      })
      .addCase(fetchGuitarsByName.rejected, (state) => {
        state.guitars.status = FetchDataStatus.Failed;
      })
      .addDefaultCase((state) => state);
  },
});

export default searchSlice.reducer;
