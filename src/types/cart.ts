import { Guitar } from './guitar';

export type CartCategory = {
  [key: number | string]: {
    items: CartProduct[];
    totalPrice: number;
  };
};

export type CartProduct = Omit<Guitar, 'rating' | 'comments' | 'description'> & {
  totalPrice?: number;
};
