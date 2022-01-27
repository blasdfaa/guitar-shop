import { generateCartProduct, getStateWithItems } from '../../../utils/mocks';
import {
  guitarIsCartByIdSelector,
  quantityProductByIdSelector,
  selectCartItemsQuantity,
  selectCoupon,
  selectDiscountValue,
  selectGuitarsFromCart,
  selectOrderedGuitarsIds,
  selectTotalCartPrice,
  selectTotalCartPriceWithDiscount,
  serializedCartProductsSelector,
  totalPriceProductByIdSelector,
} from '../cart.selector';

import type { RootState } from '../../store';
import type { CartSliceState } from '../../../types/state';

const mockCartProduct = generateCartProduct();

describe('Selectors: cart', () => {
  describe('selectGuitarsFromCart', () => {
    test('should return all items from cart data', () => {
      const CART = getStateWithItems({
        cartItems: { [mockCartProduct.product.id]: mockCartProduct },
      }).CART;

      const expectedResult = CART.data;
      const result = selectGuitarsFromCart({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return empty object if cart is empty', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = CART.data;
      const result = selectGuitarsFromCart({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectTotalCartPrice', () => {
    test('should return correctly total cart price', () => {
      const CART = getStateWithItems({
        cartItems: { [mockCartProduct.product.id]: mockCartProduct },
      }).CART;

      const expectedResult = CART.totalCartPrice;
      const result = selectTotalCartPrice({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return 0 if cart is empty', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = CART.totalCartPrice;
      const result = selectTotalCartPrice({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectCartItemsQuantity', () => {
    test('should return correctly quantity of cart products', () => {
      const CART = getStateWithItems({
        cartItems: {
          [mockCartProduct.product.id]: mockCartProduct,
          [mockCartProduct.product.id]: mockCartProduct,
        },
      }).CART;

      const expectedResult = CART.itemsQuantity;
      const result = selectCartItemsQuantity({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return 0 if cart is empty', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = CART.itemsQuantity;
      const result = selectCartItemsQuantity({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectDiscountValue', () => {
    test('should return correctly discount of cart products', () => {
      const CART: CartSliceState = { ...getStateWithItems().CART, discount: 1500 };

      const expectedResult = CART.discount;
      const result = selectDiscountValue({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return 0 if not have a discount', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = CART.discount;
      const result = selectDiscountValue({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectTotalCartPriceWithDiscount', () => {
    test('should return correctly total price with discount of cart products', () => {
      const CART = getStateWithItems({
        cartItems: { [mockCartProduct.product.id]: mockCartProduct },
      }).CART;

      const expectedResult = CART.totalCartPriceWithDiscount;
      const result = selectTotalCartPriceWithDiscount({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return 0 if not have a discount', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = CART.totalCartPriceWithDiscount;
      const result = selectTotalCartPriceWithDiscount({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectOrderedGuitarsIds', () => {
    test('should return an array of product ids numbers', () => {
      const CART = getStateWithItems({
        cartItems: {
          1: mockCartProduct,
          2: mockCartProduct,
          3: mockCartProduct,
        },
      }).CART;

      const expectedResult = [1, 2, 3];
      const result = selectOrderedGuitarsIds({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return empty array if cart products is empty', () => {
      const CART = getStateWithItems().CART;

      const expectedResult: number[] = [];
      const result = selectOrderedGuitarsIds({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectCoupon', () => {
    test('should return coupon', () => {
      const fakeCoupon = 'fake-123';
      const CART = { ...getStateWithItems().CART, coupon: fakeCoupon };

      const expectedResult = fakeCoupon;
      const result = selectCoupon({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return null if not have a coupon', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = null;
      const result = selectCoupon({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('guitarIsCartByIdSelector', () => {
    test('should return true if cart product in cart', () => {
      const FAKE_PRODUCT_ID = 2;
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      const result = guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);

      expect(result).toBeTruthy();
    });
    test('should return false if item is not in cart', () => {
      const FAKE_PRODUCT_ID = 1;
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      const result = guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);

      expect(result).toBeFalsy();
    });
    test('should not compute again with same state', () => {
      const FAKE_PRODUCT_ID = 2;
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      guitarIsCartByIdSelector.resetRecomputations();
      guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(guitarIsCartByIdSelector.recomputations()).toEqual(1);
      guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(guitarIsCartByIdSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const FAKE_PRODUCT_ID = 2;
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      guitarIsCartByIdSelector.resetRecomputations();
      guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(guitarIsCartByIdSelector.recomputations()).toEqual(1);
      CART.data = { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct };
      guitarIsCartByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(guitarIsCartByIdSelector.recomputations()).toEqual(2);
    });
  });

  describe('serializedCartProductsSelector', () => {
    test('should return serialized array of object products', () => {
      const CART = getStateWithItems({
        cartItems: {
          1: mockCartProduct,
          2: mockCartProduct,
        },
      }).CART;

      const expectedResult = [mockCartProduct.product, mockCartProduct.product];
      const result = serializedCartProductsSelector({ CART } as RootState);

      expect(result).toEqual(expectedResult);
    });
    test('should return empty array if cart is empty', () => {
      const CART = getStateWithItems().CART;

      const result = serializedCartProductsSelector({ CART } as RootState);

      expect(result).toEqual([]);
    });
    test('should not compute again with same state', () => {
      const CART = getStateWithItems({
        cartItems: { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct },
      }).CART;

      serializedCartProductsSelector.resetRecomputations();
      serializedCartProductsSelector({ CART } as RootState);
      expect(serializedCartProductsSelector.recomputations()).toEqual(1);
      serializedCartProductsSelector({ CART } as RootState);
      serializedCartProductsSelector({ CART } as RootState);
      expect(serializedCartProductsSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      serializedCartProductsSelector.resetRecomputations();
      serializedCartProductsSelector({ CART } as RootState);
      expect(serializedCartProductsSelector.recomputations()).toEqual(1);
      CART.data = { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct };
      serializedCartProductsSelector({ CART } as RootState);
      expect(serializedCartProductsSelector.recomputations()).toEqual(2);
    });
  });

  describe('totalPriceProductByIdSelector', () => {
    const FAKE_PRODUCT_ID = 2;

    test('should return total price of products by id', () => {
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      const expectedResult = mockCartProduct.totalPrice;
      const result = totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);

      expect(result).toEqual(expectedResult);
    });
    test('should return 0 if product is not in the cart', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = 0;
      const result = totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);

      expect(result).toEqual(expectedResult);
    });
    test('should not compute again with same state', () => {
      const CART = getStateWithItems({
        cartItems: { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct },
      }).CART;

      totalPriceProductByIdSelector.resetRecomputations();
      totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(totalPriceProductByIdSelector.recomputations()).toEqual(1);
      totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(totalPriceProductByIdSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      totalPriceProductByIdSelector.resetRecomputations();
      totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(totalPriceProductByIdSelector.recomputations()).toEqual(1);
      CART.data = { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct };
      totalPriceProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(totalPriceProductByIdSelector.recomputations()).toEqual(2);
    });
  });

  describe('quantityProductByIdSelector', () => {
    const FAKE_PRODUCT_ID = 2;

    test('should return quantity of products by id', () => {
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      const expectedResult = mockCartProduct.quantity;
      const result = quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);

      expect(result).toEqual(expectedResult);
    });
    test('should return 0 if product is not in the cart', () => {
      const CART = getStateWithItems().CART;

      const expectedResult = 0;
      const result = quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);

      expect(result).toEqual(expectedResult);
    });
    test('should not compute again with same state', () => {
      const CART = getStateWithItems({
        cartItems: { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct },
      }).CART;

      quantityProductByIdSelector.resetRecomputations();
      quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(quantityProductByIdSelector.recomputations()).toEqual(1);
      quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(quantityProductByIdSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const CART = getStateWithItems({
        cartItems: { 2: mockCartProduct },
      }).CART;

      quantityProductByIdSelector.resetRecomputations();
      quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(quantityProductByIdSelector.recomputations()).toEqual(1);
      CART.data = { 1: mockCartProduct, 2: mockCartProduct, 3: mockCartProduct };
      quantityProductByIdSelector({ CART } as RootState, FAKE_PRODUCT_ID);
      expect(quantityProductByIdSelector.recomputations()).toEqual(2);
    });
  });
});
