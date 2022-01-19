import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import { getStoreWithState, RootState } from '../../store';
import {
  generateGuitarItem,
  generateGuitarReview,
  generatePostReview,
  getStateWithItems,
} from '../../../utils/mocks';
import { fetchProductById, postReview } from '../product.async';
import api from '../../api';
import { FetchDataStatus } from '../../../constants';

describe('Thunk: product', () => {
  const mockStore = configureMockStore<RootState>([thunk]);

  describe('fetchProductById', () => {
    test('should fetch success', async () => {
      const store = mockStore({});
      const expectedProduct = generateGuitarItem();
      const expectedActions = [
        {
          type: fetchProductById.pending.type,
        },
        {
          type: fetchProductById.fulfilled.type,
          payload: expectedProduct,
        },
      ];

      jest.spyOn(api, 'get').mockResolvedValue({ data: expectedProduct });

      await store.dispatch(fetchProductById(1) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should fetch failed', async () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: fetchProductById.pending.type,
        },
        {
          type: fetchProductById.rejected.type,
          payload: undefined,
        },
      ];

      jest.spyOn(api, 'get').mockRejectedValue({ data: undefined });

      await store.dispatch(fetchProductById(1) as never);

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
      const expectedProduct = generateGuitarItem();
      const { comments, ...product } = expectedProduct;

      jest.spyOn(api, 'get').mockResolvedValue({ data: expectedProduct });

      await store.dispatch(fetchProductById(1));

      expect(store.getState().PRODUCT.data).toEqual(product);
      expect(store.getState().PRODUCT.status).toEqual(FetchDataStatus.Success);
      expect(store.getState().PRODUCT.reviews.data).toEqual(comments);
      expect(store.getState().PRODUCT.reviews.status).toEqual(FetchDataStatus.Success);
    });
    test('should correctly change state after failed response', async () => {
      const state = getStateWithItems([generateGuitarItem()]);
      const store = getStoreWithState(state);

      jest.spyOn(api, 'get').mockRejectedValue({ data: undefined });

      await store.dispatch(fetchProductById(1));

      expect(store.getState().PRODUCT.data).toEqual(null);
      expect(store.getState().PRODUCT.status).toEqual(FetchDataStatus.Failed);
      expect(store.getState().PRODUCT.reviews.data).toEqual([]);
      expect(store.getState().PRODUCT.reviews.status).toEqual(FetchDataStatus.Failed);
    });
  });
  describe('postReview', () => {
    test('should fetch success', async () => {
      const store = mockStore({});
      const mockPostReview = generatePostReview();
      const expectedReviews = [generateGuitarReview(), generateGuitarReview(), generateGuitarReview()];
      const expectedActions = [
        {
          type: postReview.pending.type,
        },
        {
          type: postReview.fulfilled.type,
          payload: expectedReviews,
        },
      ];

      jest.spyOn(api, 'post').mockResolvedValue({ data: expectedReviews });

      await store.dispatch(postReview(mockPostReview) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should fetch failed', async () => {
      const store = mockStore({});
      const mockPostReview = generatePostReview();
      const expectedActions = [
        {
          type: postReview.pending.type,
        },
        {
          type: postReview.rejected.type,
          payload: undefined,
        },
      ];

      jest.spyOn(api, 'post').mockRejectedValue({ data: undefined });

      await store.dispatch(postReview(mockPostReview) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should correctly change state after success response', async () => {
      const state = getStateWithItems([], [generateGuitarReview()]);
      const store = getStoreWithState(state);
      const mockPostReview = generatePostReview();
      const expectedReview = generateGuitarReview();

      jest.spyOn(api, 'post').mockResolvedValue({ data: expectedReview });

      await store.dispatch(postReview(mockPostReview));

      expect(store.getState().PRODUCT.reviews.data).toEqual([...state.PRODUCT.reviews.data, expectedReview]);
      expect(store.getState().PRODUCT.reviews.status).toEqual(FetchDataStatus.Success);
    });
    test('should correctly change state after failed response', async () => {
      const state = getStateWithItems([], [generateGuitarReview()]);
      const mockPostReview = generatePostReview();
      const store = getStoreWithState(state);

      jest.spyOn(api, 'post').mockRejectedValue({ data: undefined });

      await store.dispatch(postReview(mockPostReview));

      expect(store.getState().PRODUCT.reviews.status).toEqual(FetchDataStatus.Failed);
    });
  });
});
