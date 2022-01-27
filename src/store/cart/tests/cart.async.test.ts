import thunk from 'redux-thunk';

import api from '../../api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { postCartOrder, postPromocodeDiscount } from '../cart.async';
import { setValidCoupon } from '../cart.slice';
import { getStateWithItems } from '../../../utils/mocks';
import { getStoreWithState } from '../../store';

import type { RootState } from '../../store';
import type { CartOrder } from '../../../types/cart';

describe('Thunks: cart', () => {
  const mockStore = configureMockStore<RootState>([thunk]);

  describe('postPromocodeDiscount', () => {
    test('should call correctly actions if post promocode success', async () => {
      const RESPONSE_SUCCESS_STATUS = 200;
      const store = mockStore({});
      const expectedDiscount = 15;
      const expectedCoupon = 'fake-123';
      const expectedActions = [
        {
          type: postPromocodeDiscount.pending.type,
        },
        {
          type: setValidCoupon.type,
          payload: expectedCoupon,
        },
        {
          type: postPromocodeDiscount.fulfilled.type,
          payload: expectedDiscount,
        },
      ];

      jest
        .spyOn(api, 'post')
        .mockResolvedValue({ data: expectedDiscount, status: RESPONSE_SUCCESS_STATUS });

      await store.dispatch(postPromocodeDiscount({ coupon: expectedCoupon }) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should call correctly actions if post promocode failed', async () => {
      const store = mockStore({});
      const expectedCoupon = 'fake-123';
      const expectedActions = [
        {
          type: postPromocodeDiscount.pending.type,
        },
        {
          type: postPromocodeDiscount.rejected.type,
        },
      ];

      jest.spyOn(api, 'post').mockRejectedValue({ data: undefined });

      await store.dispatch(postPromocodeDiscount({ coupon: expectedCoupon }) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should correctly change state after success response', async () => {
      const FAKE_COUPON = 'fake-123';
      const state = getStateWithItems();
      const store = getStoreWithState(state);
      const expectedDiscountPercent = 15;

      jest.spyOn(api, 'post').mockResolvedValue({ data: expectedDiscountPercent });

      await store.dispatch(postPromocodeDiscount({ coupon: FAKE_COUPON }));

      const result = store.getState().CART;

      expect(result.discountPercent).toEqual(expectedDiscountPercent);
    });
    test('should correctly change state after failed response', async () => {
      const FAKE_COUPON = 'fake-123';
      const state = getStateWithItems();
      const store = getStoreWithState(state);
      const expectedDiscountPercent = 0;

      jest.spyOn(api, 'post').mockRejectedValue({ data: undefined });

      await store.dispatch(postPromocodeDiscount({ coupon: FAKE_COUPON }));

      const result = store.getState().CART;

      expect(result.discountPercent).toEqual(expectedDiscountPercent);
    });
  });

  describe('postCartOrder', () => {
    const mockOrder: CartOrder = {
      coupon: 'fake-123',
      guitarsIds: [1, 2],
    };

    test('should call correctly actions if post order success', async () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: postCartOrder.pending.type,
        },

        {
          type: postCartOrder.fulfilled.type,
        },
      ];

      jest.spyOn(api, 'post').mockResolvedValue({ data: undefined });

      await store.dispatch(postCartOrder(mockOrder) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
    test('should call correctly actions if post promocode failed', async () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: postCartOrder.pending.type,
        },
        {
          type: postCartOrder.rejected.type,
        },
      ];

      jest.spyOn(api, 'post').mockRejectedValue({ data: undefined });

      await store.dispatch(postCartOrder(mockOrder) as never);

      expect(
        store.getActions().map((action) => ({
          type: action.type,
          payload: action.payload,
        })),
      ).toEqual(expectedActions);
    });
  });
});
