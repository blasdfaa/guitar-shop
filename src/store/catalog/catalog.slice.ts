import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type catalogSliceType = {
  sortBy: string;
  order: string;
  minGuitarPrice: number;
  maxGuitarPrice: number;
  filters: {
    priceMin: string;
    priceMax: string;
    guitarTypes: string[] | [];
    stringsCount: string[] | [];
  };
};

const initialState: catalogSliceType = {
  sortBy: '',
  order: '',
  minGuitarPrice: 0,
  maxGuitarPrice: 0,
  filters: {
    priceMin: '',
    priceMax: '',
    guitarTypes: [],
    stringsCount: [],
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.order = action.payload;
    },
    setPriceMinFilter(state, action: PayloadAction<string>) {
      state.filters.priceMin = action.payload;
    },
    setPriceMaxFilter(state, action: PayloadAction<string>) {
      state.filters.priceMax = action.payload;
    },
    setMinGuitarPrice(state, action: PayloadAction<number>) {
      state.minGuitarPrice = action.payload;
    },
    setMaxGuitarPrice(state, action: PayloadAction<number>) {
      state.maxGuitarPrice = action.payload;
    },
  },
});

export const {
  setSortType,
  setOrder,
  setPriceMinFilter,
  setPriceMaxFilter,
  setMinGuitarPrice,
  setMaxGuitarPrice,
} = catalogSlice.actions;
export default catalogSlice.reducer;
