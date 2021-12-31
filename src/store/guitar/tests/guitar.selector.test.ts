import faker from 'faker';

import { FetchDataStatus } from '../../../constants';
import {
  calculatedGuitarPriceSelector,
  selectGuitarsItems,
  selectGuitarsLoadingStatus,
  selectGuitarsTotalCount,
} from '../guitar.selector';
import { generateGuitarItem } from '../../../utils/mocks';

import type { GuitarSliceState } from '../guitar.slice';
import type { RootState } from '../../store';

describe('Selectors: guitar', () => {
  describe('selectGuitarsLoadingStatus', () => {
    test('should return loading status', () => {
      const GUITARS: GuitarSliceState = {
        items: [],
        status: FetchDataStatus.Idle,
        guitarsTotalCount: 0,
      };

      const result = selectGuitarsLoadingStatus({ GUITARS } as RootState);

      expect(result).toEqual(FetchDataStatus.Idle);
    });
  });

  describe('selectGuitarsItems', () => {
    test('should return guitars array', () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const GUITARS: GuitarSliceState = {
        items: mockGuitars,
        status: FetchDataStatus.Idle,
        guitarsTotalCount: 0,
      };

      const result = selectGuitarsItems({ GUITARS } as RootState);

      expect(result).toEqual(mockGuitars);
    });
    test('should return empty array with empty data', () => {
      const GUITARS: GuitarSliceState = {
        items: [],
        status: FetchDataStatus.Idle,
        guitarsTotalCount: 0,
      };

      const result = selectGuitarsItems({ GUITARS } as RootState);

      expect(result).toEqual([]);
    });
  });

  describe('selectGuitarsTotalCount', () => {
    test('should return guitars total count', () => {
      const fakeGuitarsCount = faker.datatype.number();

      const GUITARS: GuitarSliceState = {
        items: [],
        status: FetchDataStatus.Idle,
        guitarsTotalCount: fakeGuitarsCount,
      };

      const result = selectGuitarsTotalCount({ GUITARS } as RootState);

      expect(result).toEqual(fakeGuitarsCount);
    });
  });

  describe('calculatedGuitarPriceSelector', () => {
    test("shouldn't return 0 if guitars items are not empty", () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const GUITARS: GuitarSliceState = {
        items: mockGuitars,
        status: FetchDataStatus.Idle,
        guitarsTotalCount: 0,
      };

      const result = calculatedGuitarPriceSelector({ GUITARS } as RootState);

      expect(result).not.toBe({
        calculatedMinPrice: 0,
        calculatedMaxPrice: 0,
      });
    });
    test('should not compute again with same state', () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const GUITARS: GuitarSliceState = {
        items: mockGuitars,
        status: FetchDataStatus.Idle,
        guitarsTotalCount: 0,
      };

      calculatedGuitarPriceSelector.resetRecomputations();
      calculatedGuitarPriceSelector({ GUITARS } as RootState);
      expect(calculatedGuitarPriceSelector.recomputations()).toEqual(1);
      calculatedGuitarPriceSelector({ GUITARS } as RootState);
      calculatedGuitarPriceSelector({ GUITARS } as RootState);
      expect(calculatedGuitarPriceSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const mockGuitars = [generateGuitarItem(), generateGuitarItem()];

      const GUITARS: GuitarSliceState = {
        items: mockGuitars,
        status: FetchDataStatus.Idle,
        guitarsTotalCount: 0,
      };

      calculatedGuitarPriceSelector.resetRecomputations();
      calculatedGuitarPriceSelector({ GUITARS } as RootState);
      expect(calculatedGuitarPriceSelector.recomputations()).toEqual(1);
      GUITARS.items = [...mockGuitars, ...mockGuitars];
      calculatedGuitarPriceSelector({ GUITARS } as RootState);
      expect(calculatedGuitarPriceSelector.recomputations()).toEqual(2);
    });
  });
});
