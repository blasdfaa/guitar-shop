import { RootState } from '../store';

const all = (state: RootState) => state.CATALOG_PAGE;
const filters = (state: RootState) => all(state).filters;

export const getSortingType = (state: RootState) => all(state).sortBy;
export const getOrderType = (state: RootState) => all(state).order;

export const getSelectedPriceMinFilter = (state: RootState) => filters(state).priceMin;
export const getSelectedPriceMaxFilter = (state: RootState) => filters(state).priceMax;

export const getMinGuitarPrice = (state: RootState) => all(state).minGuitarPrice;
export const getMaxGuitarPrice = (state: RootState) => all(state).maxGuitarPrice;
