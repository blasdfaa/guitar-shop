import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionCreator, APIEndpoint } from '../../constants';
import api from '../api';

export const postPromocodeDiscount = createAsyncThunk<number, { coupon: string }>(
  ActionCreator.PostPromocodeDiscount,
  async (coupon) => {
    const { data } = await api.post<number>(APIEndpoint.Coupons, coupon);

    return data;
  },
);
