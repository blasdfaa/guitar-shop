import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';
import { ActionCreator, APIEndpoint } from '../../constants';
import { setGuitarsCount } from './guitar.slice';

import type { Guitar } from '../../types/guitar';

const GUITAR_DATA_LIMIT = 9;
const TOTAL_COUNT_HEADER = 'x-total-count';

export const fetchGuitarsWithParams = createAsyncThunk<Guitar[], string | undefined>(
  ActionCreator.FetchGuitarsWithParams,
  async (searchParams = '', { dispatch }) => {
    const { data, headers } = await api.get<Guitar[]>(`${APIEndpoint.Guitars}${searchParams}`, {
      params: {
        _limit: GUITAR_DATA_LIMIT,
      },
    });

    const totalGuitarsHeader = headers[TOTAL_COUNT_HEADER] || null;

    if (totalGuitarsHeader) {
      dispatch(setGuitarsCount(Number(totalGuitarsHeader)));
    }

    return data;
  },
);
