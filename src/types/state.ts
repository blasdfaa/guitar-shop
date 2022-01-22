import type { FetchDataStatus } from '../constants';
import type { Guitar, GuitarWithoutReviews } from './guitar';
import type { GuitarReview } from './review';
import { CartProduct } from './guitar';

export type GuitarSliceState = {
  items: Guitar[];
  status: FetchDataStatus;
  guitarsTotalCount: number;
  currentRequestId?: string;
};

export type SearchSliceState = {
  guitars: {
    data: GuitarWithoutReviews[];
    status: FetchDataStatus;
  };
};

export type ProductSliceState = {
  data: GuitarWithoutReviews | null;
  status: FetchDataStatus;
  reviews: {
    data: GuitarReview[];
    status: FetchDataStatus;
  };
};

export type CartSliceState = {
  data: {
    guitars: {
      [key: number]: {
        items: CartProduct[];
        totalPrice: number;
      };
    };
  };
  status: FetchDataStatus;
  totalCartPrice: number;
  itemsQuantity: number;
};
