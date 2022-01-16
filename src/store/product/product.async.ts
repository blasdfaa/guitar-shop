import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionCreator, APIEndpoint } from '../../constants';
import api from '../api';

import type { GuitarWithReviews } from '../../types/guitar';

export const fetchProductById = createAsyncThunk<GuitarWithReviews, number>(
  ActionCreator.FetchProductById,
  async (productId) => {
    const { data } = await api.get<GuitarWithReviews>(
      `${APIEndpoint.Guitars}/${productId}?_embed=${APIEndpoint.Reviews}`,
    );

    return data;
  },
);
