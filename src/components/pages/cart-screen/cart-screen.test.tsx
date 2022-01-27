import { fireEvent, screen, waitFor } from '@testing-library/react';

import CartScreen from './cart-screen';
import { renderWithContext } from '../../../utils/test-utils';
import { generateCartProduct, getStateWithItems } from '../../../utils/mocks';

const mockCartProducts = {
  1: generateCartProduct(),
  2: generateCartProduct(),
  3: generateCartProduct(),
};

describe('Component: CartScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly cart products', () => {
    const state = getStateWithItems({ cartItems: mockCartProducts });

    renderWithContext(<CartScreen />, state);

    expect(screen.getByRole('heading', { name: /Корзина/i })).toBeInTheDocument();
    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByTestId('total-cart-price')).toBeInTheDocument();
    expect(screen.getByTestId('total-cart-price').textContent).toEqual(
      `${state.CART.totalCartPrice.toLocaleString()} ₽`,
    );
    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
    expect(screen.getByText(`- ${state.CART.discount} ₽`)).toBeInTheDocument();
    expect(screen.getByText(/К оплате/i)).toBeInTheDocument();
    expect(screen.getByTestId('total-cart-price-with-discount')).toBeInTheDocument();
    expect(screen.getByTestId('total-cart-price-with-discount').textContent).toEqual(
      `${state.CART.totalCartPriceWithDiscount.toLocaleString()} ₽`,
    );
    expect(screen.getByRole('button', { name: /Оформить заказ/i })).toBeInTheDocument();
  });
  test('should render empty message if cart is empty', () => {
    renderWithContext(<CartScreen />);

    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });
  test('should clear cart products and render empty message when click on order button', async () => {
    const state = getStateWithItems({ cartItems: mockCartProducts });

    renderWithContext(<CartScreen />, state);

    const orderButton = screen.getByRole('button', { name: /Оформить заказ/i });

    fireEvent.click(orderButton);

    await waitFor(() => {
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    });
  });
  test('should render cart products', () => {
    const state = getStateWithItems({ cartItems: mockCartProducts });
    renderWithContext(<CartScreen />, state);

    expect(screen.getAllByTestId('cart-item').length).toEqual(Object.keys(mockCartProducts).length);
  });
});
