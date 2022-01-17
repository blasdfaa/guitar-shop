import type { FetchDataStatus } from '../constants';
import type { Guitar } from './guitar';
import type { GuitarReview } from './review';

export type GuitarSliceState = {
  items: Guitar[] | [];
  status: FetchDataStatus;
  guitarsTotalCount: number;
  currentRequestId?: string;
};

export type SearchSliceState = {
  guitars: {
    data: Guitar[] | [];
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
