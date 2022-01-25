import type { CartProduct } from '../types/cart';
import type { CartSliceState } from '../types/state';

type CartProductSumKeys = Pick<CartProduct, 'totalPrice' | 'quantity'>;

export const getTotalSumOfAllProducts = (
  products: Record<number, CartProduct>,
  key: string,
): number =>
  Object.values(products).reduce(
    (acc, product) => acc + product[key as keyof CartProductSumKeys],
    0,
  );

export const setCartToLocalStorage = (key: string, data: CartSliceState): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCartFromLocalStorage = (key: string): CartSliceState | null => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};
