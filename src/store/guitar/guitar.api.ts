import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { APIRoute } from '../../constants';

import type { Guitar } from '../../types/guitar';

const API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

const guitarApi = createApi({
  reducerPath: 'GUITARS',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllGuitars: builder.query<Guitar[], void>({
      query: () => APIRoute.Guitars,
    }),
    getGuitarByName: builder.query<Guitar[], string>({
      query: (name) => ({
        url: APIRoute.Guitars,
        params: {
          name,
        },
      }),
    }),
  }),
});

export const { useGetAllGuitarsQuery, useGetGuitarByNameQuery } = guitarApi;
export default guitarApi;
