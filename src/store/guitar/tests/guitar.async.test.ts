import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

import api from '../../api';
import { fetchGuitarsWithParams } from '../guitar.async';
import { getStoreWithState, RootState } from '../../store';
import { generateGuitarItem, getStateWithItems } from '../../../utils/mocks';
import { setGuitarsCount } from '../guitar.slice';
import { FetchDataStatus } from '../../../constants';

describe('Thunks: guitar', () => {
  const mockStore = configureMockStore<RootState>([thunk]);

  describe('fetchGuitarsWithParams', () => {
    test('should fetch success', async () => {
      const expectedGuitars = [generateGuitarItem(), generateGuitarItem()];
      const expectedActions = [
        {
          type: fetchGuitarsWithParams.pending.type,
        },
        {
          type: fetchGuitarsWithParams.fulfilled.type,
          payload: expectedGuitars,
        },
      ];
      const store = mockStore({});

      jest
        .spyOn(api, 'get')
        .mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));

      await store.dispatch(fetchGuitarsWithParams() as never);

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
          type: fetchGuitarsWithParams.pending.type,
        },
        {
          type: fetchGuitarsWithParams.rejected.type,
          payload: undefined,
        },
      ];
      const store = mockStore({});

      jest.spyOn(api, 'get').mockImplementation(() => Promise.reject({ data: [], headers: {} }));

      await store.dispatch(fetchGuitarsWithParams() as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should fetch with total count header success', async () => {
      const expectedGuitars = [generateGuitarItem(), generateGuitarItem()];
      const expectedActions = [
        {
          type: fetchGuitarsWithParams.pending.type,
        },
        {
          type: setGuitarsCount.type,
          payload: 2,
        },
        {
          type: fetchGuitarsWithParams.fulfilled.type,
          payload: expectedGuitars,
        },
      ];
      const store = mockStore({});

      jest
        .spyOn(api, 'get')
        .mockImplementation(() =>
          Promise.resolve({ data: expectedGuitars, headers: { 'x-total-count': 2 } }),
        );

      await store.dispatch(fetchGuitarsWithParams() as never);

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
        .mockImplementation(() =>
          Promise.resolve({ data: expectedGuitars, headers: { 'x-total-count': 2 } }),
        );

      await store.dispatch(fetchGuitarsWithParams());

      expect(store.getState().GUITARS.items).toEqual(expectedGuitars);
      expect(store.getState().GUITARS.status).toEqual(FetchDataStatus.Success);
      expect(store.getState().GUITARS.guitarsTotalCount).toEqual(2);
    });
    test('should correctly change state after failed response', async () => {
      const state = getStateWithItems([generateGuitarItem()]);
      const store = getStoreWithState(state);

      jest.spyOn(api, 'get').mockImplementation(() => Promise.reject({ data: [], headers: {} }));

      await store.dispatch(fetchGuitarsWithParams());

      expect(store.getState().GUITARS.items).toEqual([]);
      expect(store.getState().GUITARS.status).toEqual(FetchDataStatus.Failed);
      expect(store.getState().GUITARS.guitarsTotalCount).toEqual(0);
    });
  });
});
