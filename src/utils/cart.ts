import { CartProduct } from '../types/guitar';

export const getProductsQuantity = (products: CartProduct[]): number =>
  products.reduce((acc, item) => acc + item.price, 0);

export const getTotalCartPrice = (cartItems: Record<number, unknown>) => {
  console.log(cartItems);
};
