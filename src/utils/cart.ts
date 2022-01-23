import type { CartCategory, CartProduct } from '../types/cart';

export const getTotalProductsPrice = (products: CartProduct[]): number =>
  products.reduce((acc, item) => acc + item.price, 0);

export const getSumTypePath = (product: Record<string, any>, path: string) => {
  const [firstKey, ...keys] = path.split('.');

  return keys.reduce((val, key) => val[key], product[firstKey]);
};

export const getTotalCartSum = (data: CartCategory, path: string) =>
  Object.values(data).reduce((sum, product) => {
    const value = getSumTypePath(product, path);

    return sum + value;
  }, 0);
