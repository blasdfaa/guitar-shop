import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import api from '../../api';
import type { RootState } from '../../store';
import { getStoreWithState } from '../../store';
import { generateGuitarItem, generateSearchedGuitars, getStateWithItems } from '../../../utils/mocks';
import { fetchGuitarsByName } from '../search.async';
import { FetchDataStatus } from '../../../constants';

describe('Thunk: search', () => {
  const mockStore = configureMockStore<RootState>([thunk]);

  describe('fetchGuitarsByName', () => {
    test('should fetch success', async () => {
      const expectedGuitars = [generateSearchedGuitars('fake'), generateSearchedGuitars('fake')];
      const expectedActions = [
        {
          type: fetchGuitarsByName.pending.type,
        },
        {
          type: fetchGuitarsByName.fulfilled.type,
          payload: expectedGuitars,
        },
      ];
      const store = mockStore({});

      jest
        .spyOn(api, 'get')
        .mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));

      await store.dispatch(fetchGuitarsByName('fake') as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should fetch failed', async () => {
      const expectedActions = [
        {
          type: fetchGuitarsByName.pending.type,
        },
        {
          type: fetchGuitarsByName.rejected.type,
          payload: undefined,
        },
      ];
      const store = mockStore({});

      jest.spyOn(api, 'get').mockImplementation(() => Promise.reject({ data: [], headers: {} }));

      await store.dispatch(fetchGuitarsByName('fake') as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should correctly change state after success response', async () => {
      const state = getStateWithItems([generateGuitarItem()]);
      const store = getStoreWithState(state);
      const expectedGuitars = [generateGuitarItem(), generateGuitarItem()];

      jest
        .spyOn(api, 'get')
        .mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));

      await store.dispatch(fetchGuitarsByName('fake'));

      expect(store.getState().SEARCH.guitars.data).toEqual(expectedGuitars);
      expect(store.getState().SEARCH.guitars.status).toEqual(FetchDataStatus.Success);
    });
    test('should correctly change state after failed response', async () => {
      const state = getStateWithItems([generateGuitarItem()]);
      const store = getStoreWithState(state);

      jest.spyOn(api, 'get').mockImplementation(() => Promise.reject({ data: [], headers: {} }));

      await store.dispatch(fetchGuitarsByName('fake'));

      expect(store.getState().SEARCH.guitars.data).toEqual([]);
      expect(store.getState().SEARCH.guitars.status).toEqual(FetchDataStatus.Failed);
    });
  });
});
