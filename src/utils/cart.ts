import type { CartProduct } from '../types/cart';

type CartProductSumKeys = Pick<CartProduct, 'totalPrice' | 'quantity'>;

export const getTotalSumOfAllProducts = (
  products: Record<number, CartProduct>,
  key: string,
): number =>
  Object.values(products).reduce(
    (acc, product) => acc + product[key as keyof CartProductSumKeys],
    0,
  );
