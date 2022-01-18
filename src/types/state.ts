import type { FetchDataStatus } from '../constants';
import type { Guitar, GuitarWithoutReviews } from './guitar';
import type { GuitarReview } from './review';

export type GuitarSliceState = {
  items: GuitarWithoutReviews[];
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
  data: Guitar | null;
  status: FetchDataStatus;
  reviews: {
    data: GuitarReview[];
    status: FetchDataStatus;
  };
};
