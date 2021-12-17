import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchedGuitarSlice = createSlice({
  name: 'searchedGuitar',
  initialState: '',
  reducers: {
    selectGuitar(_state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { selectGuitar } = searchedGuitarSlice.actions;
export default searchedGuitarSlice.reducer;
