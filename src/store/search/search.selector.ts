import { createSelector } from 'reselect';

import type { RootState } from '../store';
import type { Guitar } from '../../types/guitar';

export const selectSearchedGuitars = (state: RootState): Guitar[] | [] => state.SEARCH.guitars.data;

export const searchedGuitarsByNameSelector = createSelector(
  [selectSearchedGuitars, (_state: RootState, name: string) => name],
  (items, searchingName): Guitar[] | [] =>
    items.filter((guitar) => guitar.name.toLowerCase().includes(searchingName.toLowerCase())),
);
