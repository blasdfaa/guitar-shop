import { createSelector } from 'reselect';

import guitarApi from './guitar.api';

const selectAllGuitars = guitarApi.endpoints.getAllGuitars.select();

export const allGuitarsSelector = createSelector(selectAllGuitars, (result) => result);
