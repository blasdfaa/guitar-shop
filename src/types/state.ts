import type { FetchDataStatus } from '../constants';
import type { Guitar, GuitarWithoutReviews } from './guitar';
import type { GuitarReview } from './review';
import type { CartCategory } from './cart';

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
  data: Record<string, CartCategory>;
  status: FetchDataStatus;
  totalCartPrice: number;
  itemsQuantity: number;
};
