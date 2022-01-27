import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionCreator, APIEndpoint } from '../../constants';
import { setValidCoupon } from './cart.slice';
import api from '../api';

import type { CartOrder } from '../../types/cart';

export const postPromocodeDiscount = createAsyncThunk<number, { coupon: string }>(
  ActionCreator.PostPromocodeDiscount,
  async (coupon, { dispatch }) => {
    const { data, status } = await api.post<number>(APIEndpoint.Coupons, coupon);

    if (status === 200) {
      dispatch(setValidCoupon(coupon.coupon));
    }

    return data;
  },
);

export const postCartOrder = createAsyncThunk<void, CartOrder>(
  ActionCreator.PostCartOrder,
  async (order) => {
    const { data } = await api.post<void>(APIEndpoint.Orders, order);

    return data;
  },
);
