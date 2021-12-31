import type { SearchSliceState } from '../search.slice';
import { FetchDataStatus } from '../../../constants';
import { searchedGuitarsByNameSelector, selectSearchedGuitars } from '../search.selector';
import { generateGuitarItem, generateSearchedGuitars } from '../../../utils/mocks';

import type { RootState } from '../../store';

describe('Search selectors', () => {
  describe('selectSearchedGuitars', () => {
    test('should return guitars array', () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const SEARCH: SearchSliceState = {
        guitars: {
          data: mockGuitars,
          status: FetchDataStatus.Idle,
        },
      };

      const result = selectSearchedGuitars({ SEARCH } as RootState);

      expect(result).toEqual(mockGuitars);
    });
    test('should return empty array with empty data', () => {
      const SEARCH: SearchSliceState = {
        guitars: {
          data: [],
          status: FetchDataStatus.Idle,
        },
      };

      const result = selectSearchedGuitars({ SEARCH } as RootState);

      expect(result).toEqual([]);
    });
  });

  describe('searchedGuitarsByNameSelector', () => {
    test('should return searching guitar item by a strictly matched name', () => {
      const mockSearchedGuitars = [generateSearchedGuitars('fake1'), generateSearchedGuitars('fake2')];

      const SEARCH: SearchSliceState = {
        guitars: {
          data: mockSearchedGuitars,
          status: FetchDataStatus.Idle,
        },
      };

      const firstSearchingGuitar = searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake1');
      expect(firstSearchingGuitar).toEqual([mockSearchedGuitars[0]]);

      const secondSearchingGuitar = searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake2');
      expect(secondSearchingGuitar).toEqual([mockSearchedGuitars[1]]);
    });
    test('should return searching guitars items by matched names', () => {
      const mockSearchedGuitars = [generateSearchedGuitars('fake1'), generateSearchedGuitars('fake2')];

      const SEARCH: SearchSliceState = {
        guitars: {
          data: mockSearchedGuitars,
          status: FetchDataStatus.Idle,
        },
      };

      const firstSearchingGuitar = searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake');
      expect(firstSearchingGuitar).toEqual(mockSearchedGuitars);
    });
    test('should not compute again with same state', () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const SEARCH: SearchSliceState = {
        guitars: {
          data: mockGuitars,
          status: FetchDataStatus.Idle,
        },
      };

      searchedGuitarsByNameSelector.resetRecomputations();
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake');
      expect(searchedGuitarsByNameSelector.recomputations()).toEqual(1);
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake');
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake');
      expect(searchedGuitarsByNameSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const SEARCH: SearchSliceState = {
        guitars: {
          data: mockGuitars,
          status: FetchDataStatus.Idle,
        },
      };

      searchedGuitarsByNameSelector.resetRecomputations();
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake');
      expect(searchedGuitarsByNameSelector.recomputations()).toEqual(1);
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake1');
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake2');
      searchedGuitarsByNameSelector({ SEARCH } as RootState, 'fake');
      expect(searchedGuitarsByNameSelector.recomputations()).toEqual(4);
    });
  });
});
