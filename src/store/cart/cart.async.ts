import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionCreator, APIEndpoint } from '../../constants';
import { setValidCoupon } from './cart.slice';
import api from '../api';

import type { CartOrder } from '../../types/cart';

const HTTP_SUCCESS_CODE = 200;

export const postPromocodeDiscount = createAsyncThunk<number, { coupon: string }>(
  ActionCreator.PostPromocodeDiscount,
  async (coupon, { dispatch }) => {
    const { data, status } = await api.post<number>(APIEndpoint.Coupons, coupon);

    if (status === HTTP_SUCCESS_CODE) {
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
