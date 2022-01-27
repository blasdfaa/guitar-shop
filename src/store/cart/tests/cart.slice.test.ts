import cartReducer, {
  addQuantityItem,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
  setValidCoupon,
} from '../cart.slice';
import { postCartOrder, postPromocodeDiscount } from '../cart.async';
import {
  generateCartProduct,
  getStateWithItems,
  mockLocalStorage,
} from '../../../utils/mocks';
import { getStoreWithState } from '../../store';
import { getTotalSumOfAllProducts } from '../../../utils/cart';

import type { CartSliceState } from '../../../types/state';

const INCREASE_PRODUCT_QUANTITY_STEP = 1;
const DECREASE_PRODUCT_QUANTITY_STEP = 1;
const LOCAL_STORAGE_CART_KEY = 'cart-state-value';

const mockCartProduct = generateCartProduct();

const { setItemMock } = mockLocalStorage();

describe('Reducer: cartReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return initial state when get empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = cartReducer(initialState, action);

    expect(result).toEqual({
      data: {},
      coupon: null,
      discountPercent: 0,
      discount: 0,
      totalCartPrice: 0,
      totalCartPriceWithDiscount: 0,
      itemsQuantity: 0,
    });
  });

  describe('postPromocodeDiscount', () => {
    test('should correctly calculate the discount if fulfilled action', () => {
      const expectedDiscountPercent = 15;
      const action = {
        type: postPromocodeDiscount.fulfilled.type,
        payload: expectedDiscountPercent,
      };
      const initialState = getStateWithItems({
        cartItems: {
          [mockCartProduct.product.id]: mockCartProduct,
        },
      }).CART;
      const expectedDiscount = (initialState.totalCartPrice * expectedDiscountPercent) / 100;
      const expectedState: CartSliceState = {
        data: {
          [mockCartProduct.product.id]: mockCartProduct,
        },
        coupon: null,
        discountPercent: expectedDiscountPercent,
        discount: (initialState.totalCartPrice * expectedDiscountPercent) / 100,
        totalCartPrice: mockCartProduct.totalPrice,
        totalCartPriceWithDiscount: mockCartProduct.totalPrice - expectedDiscount,
        itemsQuantity: mockCartProduct.quantity,
      };
      const state = cartReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
    test('should save cart data to local storage if fulfilled action', () => {
      const action = {
        type: postPromocodeDiscount.fulfilled.type,
      };
      const initialState = getStateWithItems({
        cartItems: {
          [mockCartProduct.product.id]: mockCartProduct,
        },
      }).CART;

      const state = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(state));
    });
  });

  describe('postCartOrder', () => {
    test('should clear cart data if fulfilled action', () => {
      const action = {
        type: postCartOrder.fulfilled.type,
      };
      const initialState = getStateWithItems({
        cartItems: {
          [mockCartProduct.product.id]: mockCartProduct,
        },
      }).CART;
      const expectedState = getStoreWithState().getState().CART;
      const state = cartReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
    test('should save cart data to local storage if fulfilled action', () => {
      const action = {
        type: postCartOrder.fulfilled.type,
      };
      const initialState = getStoreWithState().getState().CART;
      const state = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(state));
    });
  });

  describe('setValidCoupon', () => {
    const fakeCoupon = 'fake-132';

    const initialState = undefined;
    const action = setValidCoupon(fakeCoupon);

    test('should correctly set coupon', () => {
      const result = cartReducer(initialState, action);

      expect(result).toEqual({
        data: {},
        coupon: fakeCoupon,
        discountPercent: 0,
        discount: 0,
        totalCartPrice: 0,
        totalCartPriceWithDiscount: 0,
        itemsQuantity: 0,
      });
    });
    test('should save cart data to local storage', () => {
      const result = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(result));
    });
  });

  describe('addQuantityItem', () => {
    const action = addQuantityItem({ productId: mockCartProduct.product.id, value: 4 });

    const expectedProduct = {
      ...mockCartProduct,
      quantity: action.payload.value,
      totalPrice: mockCartProduct.product.price * action.payload.value,
    };
    const expectedCartItems = {
      [action.payload.productId]: expectedProduct,
    };

    test('should add quantity of selected item', () => {
      const initialState = getStateWithItems({
        cartItems: {
          [mockCartProduct.product.id]: mockCartProduct,
        },
      }).CART;

      const result = cartReducer(initialState, action);

      expect(result).toEqual({
        data: expectedCartItems,
        coupon: null,
        discountPercent: 0,
        discount: 0,
        totalCartPrice: getTotalSumOfAllProducts(expectedCartItems, 'totalPrice'),
        totalCartPriceWithDiscount: getTotalSumOfAllProducts(expectedCartItems, 'totalPrice'),
        itemsQuantity: getTotalSumOfAllProducts(expectedCartItems, 'quantity'),
      });
    });
    test('should correctly calculate discount', () => {
      const initialState = {
        data: expectedCartItems,
        coupon: null,
        discountPercent: 15,
        discount: 0,
        totalCartPrice: 0,
        totalCartPriceWithDiscount: 0,
        itemsQuantity: 0,
      };

      const result = cartReducer(initialState, action);
      const expectedDiscount =
        (getTotalSumOfAllProducts(expectedCartItems, 'totalPrice') *
          initialState.discountPercent) /
        100;
      const expectedTotalCartPriceWithDiscount =
        getTotalSumOfAllProducts(expectedCartItems, 'totalPrice') - expectedDiscount;

      expect(result).toEqual({
        data: expectedCartItems,
        coupon: null,
        discountPercent: initialState.discountPercent,
        discount: expectedDiscount,
        totalCartPrice: getTotalSumOfAllProducts(expectedCartItems, 'totalPrice'),
        totalCartPriceWithDiscount: expectedTotalCartPriceWithDiscount,
        itemsQuantity: getTotalSumOfAllProducts(expectedCartItems, 'quantity'),
      });
    });
    test('should save cart data to local storage', () => {
      const initialState = getStateWithItems({
        cartItems: {
          [mockCartProduct.product.id]: mockCartProduct,
        },
      }).CART;

      const result = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(result));
    });
  });

  describe('decreaseProductQuantity', () => {
    const action = decreaseProductQuantity(mockCartProduct.product.id);

    const initialState = {
      data: {
        [mockCartProduct.product.id]: mockCartProduct,
      },
      coupon: null,
      discountPercent: 0,
      discount: 0,
      totalCartPrice: mockCartProduct.totalPrice,
      totalCartPriceWithDiscount: mockCartProduct.totalPrice,
      itemsQuantity: mockCartProduct.quantity,
    };

    const expectedQuantity = mockCartProduct.quantity - DECREASE_PRODUCT_QUANTITY_STEP;
    const expectedTotalPrice = mockCartProduct.product.price * expectedQuantity;

    const expectedProduct = {
      ...mockCartProduct,
      quantity: expectedQuantity,
      totalPrice: expectedTotalPrice,
    };

    test('should decrease quantity product and correctly calculate price', () => {
      const result = cartReducer(initialState, action);

      expect(result).toEqual({
        data: {
          [mockCartProduct.product.id]: expectedProduct,
        },
        coupon: null,
        discountPercent: 0,
        discount: 0,
        totalCartPrice: expectedProduct.totalPrice,
        totalCartPriceWithDiscount: expectedProduct.totalPrice,
        itemsQuantity: expectedProduct.quantity,
      });
    });
    test('should save cart data to local storage', () => {
      const result = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(result));
    });
  });

  describe('increaseProductQuantity', () => {
    const action = increaseProductQuantity(mockCartProduct.product.id);

    const initialState = {
      data: {
        [mockCartProduct.product.id]: mockCartProduct,
      },
      coupon: null,
      discountPercent: 0,
      discount: 0,
      totalCartPrice: mockCartProduct.totalPrice,
      totalCartPriceWithDiscount: mockCartProduct.totalPrice,
      itemsQuantity: mockCartProduct.quantity,
    };

    const expectedQuantity = mockCartProduct.quantity + INCREASE_PRODUCT_QUANTITY_STEP;
    const expectedTotalPrice = mockCartProduct.product.price * expectedQuantity;

    const expectedProduct = {
      ...mockCartProduct,
      quantity: expectedQuantity,
      totalPrice: expectedTotalPrice,
    };

    test('should decrease quantity product and correctly calculate price', () => {
      const result = cartReducer(initialState, action);

      expect(result).toEqual({
        data: {
          [mockCartProduct.product.id]: expectedProduct,
        },
        coupon: null,
        discountPercent: 0,
        discount: 0,
        totalCartPrice: expectedProduct.totalPrice,
        totalCartPriceWithDiscount: expectedProduct.totalPrice,
        itemsQuantity: expectedProduct.quantity,
      });
    });
    test('should save cart data to local storage', () => {
      const result = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(result));
    });
  });

  describe('removeProductFromCart', () => {
    const action = removeProductFromCart(2);

    const mockCartProducts = {
      1: generateCartProduct(),
      2: generateCartProduct(),
    };
    const initialState = getStateWithItems({
      cartItems: mockCartProducts,
    }).CART;

    const expectedState: CartSliceState = {
      data: { 1: mockCartProducts[1] },
      coupon: null,
      discountPercent: 0,
      discount: 0,
      totalCartPrice: mockCartProducts[1].totalPrice,
      totalCartPriceWithDiscount: mockCartProducts[1].totalPrice,
      itemsQuantity: mockCartProducts[1].quantity,
    };

    test('should remove product by id and correctly calculate price', () => {
      const result = cartReducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
    test('should save cart data to local storage', () => {
      const result = cartReducer(initialState, action);

      expect(setItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_CART_KEY, JSON.stringify(result));
    });
  });
});
