import faker from 'faker';

import { RootState } from '../store/store';
import { FetchDataStatus, FilterGuitarType } from '../constants';
import { getTotalSumOfAllProducts } from './cart';

import type { CartGuitar, Guitar, GuitarWithoutReviews } from '../types/guitar';
import type { GuitarReview } from '../types/review';
import type { ProductInfoTab } from '../types/guitar';
import type { ReviewPost } from '../types/review';
import type { CartProduct } from '../types/cart';

type StateWithItems = {
  guitars?: Guitar[];
  reviews?: GuitarReview[];
  product?: GuitarWithoutReviews | null;
  cartItems?: Record<number, CartProduct>;
};

const guitarTypes = [
  FilterGuitarType.Ukulele,
  FilterGuitarType.Electric,
  FilterGuitarType.Acoustic,
];

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

export const generateCartProduct = (): CartProduct => {
  const price = Number(faker.commerce.price());
  const quantity = faker.datatype.number({ min: 1, max: 99 });

  return {
    product: {
      id: faker.datatype.number(10000),
      type: faker.commerce.product(),
      price,
      name: `fake guitar ${faker.commerce.productName()}`,
      previewImg: faker.image.imageUrl(),
      stringCount: faker.datatype.number(),
      vendorCode: faker.datatype.string(),
    },
    totalPrice: price * quantity,
    quantity,
  };
};

export const generateCartGuitar = (): CartGuitar => ({
  id: faker.datatype.number(10000),
  type: faker.commerce.product(),
  price: Number(faker.commerce.price()),
  name: `fake guitar ${faker.commerce.productName()}`,
  previewImg: faker.image.imageUrl(),
  stringCount: faker.datatype.number(),
  vendorCode: faker.datatype.string(),
});

export const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  });

  return { setItemMock, getItemMock };
};

export const getStateWithItems = ({
  guitars = [],
  reviews = [],
  product = null,
  cartItems = {},
}: StateWithItems = {}): RootState => ({
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
  CART: {
    data: cartItems,
    coupon: null,
    discountPercent: 0,
    discount: 0,
    totalCartPrice: getTotalSumOfAllProducts(cartItems, 'totalPrice'),
    totalCartPriceWithDiscount: getTotalSumOfAllProducts(cartItems, 'totalPrice'),
    itemsQuantity: getTotalSumOfAllProducts(cartItems, 'quantity'),
  },
});
