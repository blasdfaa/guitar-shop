import { CartCategory } from '../types/cart';

export const getCartProductPath = (obj, path: string) => {
  const [firstKey, ...keys] = path.split('.');

  return keys.reduce((val, key) => val[key], obj[firstKey]);
};

export const getTotalCartSum = (cartData: Record<string, CartCategory>, path: string) => {
  const cartCategories = Object.entries(cartData).map(([_key, value]) => value);

  return cartCategories
    .map((category) =>
      Object.values(category).reduce((sum, category) => {
        const value = getCartProductPath(category, path);

        return sum + value;
      }, 0),
    )
    .reduce((acc, sum) => acc + sum, 0);
};
