import { createSelector } from 'reselect';

import type { RootState } from '../store';
import type { Guitar } from '../../types/guitar';
import type { FetchDataStatus } from '../../constants';

export const selectSearchLoadingStatus = (state: RootState): FetchDataStatus => state.SEARCH.guitars.status;
export const selectSearchedGuitars = (state: RootState): Guitar[] | [] => state.SEARCH.guitars.data;

export const searchedGuitarsByNameSelector = createSelector(
  [selectSearchedGuitars, (_state: RootState, name: string) => name],
  (items, searchingName): Guitar[] | [] => {
    const searchValue = searchingName.toLowerCase();
    const searchResult = items.filter((guitar) => guitar.name.toLowerCase().includes(searchValue));
    const sortedSearchResult = searchResult.sort(
      (a, b) => a.name.toLowerCase().indexOf(searchValue) - b.name.toLowerCase().indexOf(searchValue),
    );

    return sortedSearchResult;
  },
);
