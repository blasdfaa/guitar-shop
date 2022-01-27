import type { CartGuitar } from './guitar';

export type CartProduct = {
  product: CartGuitar;
  totalPrice: number;
  quantity: number;
};

export type CartOrder = {
  guitarsIds: number[];
  coupon: string | null;
};
