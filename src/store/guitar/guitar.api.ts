import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIRoute } from '../../constants';

import type { Guitar } from '../../types/guitar';

const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const TOTAL_COUNT_HEADER = 'X-Total-Count';
const GUITAR_DATA_LIMIT = 9;

type GuitarsResponse = Guitar[];

const guitarApi = createApi({
  reducerPath: 'guitars',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllGuitars: builder.query<{ guitars: GuitarsResponse; totalCount: number }, string>({
      query: (string) => ({
        url: `${APIRoute.Guitars}${string}`,
        method: 'GET',
        params: {
          _limit: GUITAR_DATA_LIMIT,
        },
      }),
      transformResponse(guitars: GuitarsResponse, meta) {
        return {
          guitars,
          totalCount: Number(meta?.response?.headers.get(TOTAL_COUNT_HEADER)),
        };
      },
    }),
    getMatchedGuitarBySearch: builder.query<GuitarsResponse, string>({
      query: (name) => ({
        url: APIRoute.Guitars,
        params: {
          'name_like': name,
        },
      }),
    }),
  }),
});

export const { useGetAllGuitarsQuery, useGetMatchedGuitarBySearchQuery } = guitarApi;
export default guitarApi;
