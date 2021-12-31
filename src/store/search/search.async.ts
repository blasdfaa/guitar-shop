import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionCreator } from '../../constants';
import api from '../api';

import type { Guitar } from '../../types/guitar';

export const fetchGuitarsByName = createAsyncThunk<Guitar[], string>(
  ActionCreator.FetchGuitarsByName,
  async (name) => {
    const { data } = await api.get('/guitars', {
      params: {
        'name_like': name,
      },
    });

    return data;
  },
);
