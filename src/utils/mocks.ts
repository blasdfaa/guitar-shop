import faker from 'faker';

import { RootState } from '../store/store';
import { FetchDataStatus } from '../constants';

import type { Guitar } from '../types/guitar';

export const generateGuitarItem = (): Guitar => ({
  id: faker.datatype.number(10000),
  type: faker.commerce.product(),
  rating: faker.datatype.number(),
  price: Number(faker.commerce.price()),
  name: `fake guitar ${faker.commerce.productName()}`,
  description: faker.commerce.productDescription(),
  previewImg: faker.image.imageUrl(),
  stringCount: faker.datatype.number(),
  vendorCode: faker.datatype.string(),
});

export const generateSearchedGuitars = (name: string) => ({
  id: faker.datatype.number(10000),
  type: faker.commerce.product(),
  rating: faker.datatype.number(),
  price: Number(faker.commerce.price()),
  name: name,
  description: faker.commerce.productDescription(),
  previewImg: faker.image.imageUrl(),
  stringCount: faker.datatype.number(),
  vendorCode: faker.datatype.string(),
});

export const getStateWithItems = (items: Guitar[] = []): RootState => ({
  GUITARS: {
    items,
    guitarsTotalCount: 0,
    status: FetchDataStatus.Idle,
  },
  SEARCH: {
    guitars: {
      data: items,
      status: FetchDataStatus.Idle,
    },
  },
});
