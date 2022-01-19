import faker from 'faker';

import { RootState } from '../store/store';
import { FetchDataStatus, FilterGuitarType } from '../constants';

import type { Guitar, GuitarWithoutReviews } from '../types/guitar';
import type { GuitarReview } from '../types/review';
import { ProductInfoTab } from '../types/guitar';
import { ReviewPost } from '../types/review';

const guitarTypes = [FilterGuitarType.Ukulele, FilterGuitarType.Electric, FilterGuitarType.Acoustic];

export const generateGuitarReview = (): GuitarReview => ({
  id: faker.datatype.string(),
  guitarId: faker.datatype.number(25),
  userName: faker.internet.userName(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  comment: faker.datatype.string(),
  rating: faker.datatype.number(),
  createAt: faker.datatype.string(),
});

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
  comments: [generateGuitarReview()],
});

export const generateSearchedGuitars = (name: string): GuitarWithoutReviews => ({
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

export const generateProductTabInfo = (): ProductInfoTab => ({
  type: guitarTypes[Math.floor(Math.random() * guitarTypes.length)],
  description: faker.commerce.productDescription(),
  stringCount: faker.datatype.number(7),
  vendorCode: faker.datatype.string(7),
});

export const generatePostReview = (): ReviewPost => ({
  userName: faker.internet.userName(),
  rating: faker.datatype.number(5),
  comment: faker.lorem.paragraph(5),
  advantage: faker.lorem.paragraph(1),
  disadvantage: faker.lorem.paragraph(1),
  guitarId: faker.datatype.number(25),
});

export const getStateWithItems = (
  guitars: Guitar[] = [],
  reviews: GuitarReview[] = [],
  product: GuitarWithoutReviews | null = null,
): RootState => ({
  GUITARS: {
    items: guitars,
    guitarsTotalCount: 0,
    status: FetchDataStatus.Idle,
  },
  SEARCH: {
    guitars: {
      data: guitars.map(({ comments, ...guitar }) => guitar as GuitarWithoutReviews),
      status: FetchDataStatus.Idle,
    },
  },
  PRODUCT: {
    data: product,
    status: FetchDataStatus.Idle,
    reviews: {
      data: reviews,
      status: FetchDataStatus.Idle,
    },
  },
});
