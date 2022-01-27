import { screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test-utils';
import HeaderCartLink from './header-cart-link';
import { AppRoute } from '../../constants';
import { generateCartProduct, getStateWithItems } from '../../utils/mocks';

const mockCarProduct = generateCartProduct();

describe('Component: HeaderCartLink', () => {
  test('should render correctly', () => {
    renderWithContext(<HeaderCartLink />);

    const cartLink = screen.getByRole('link', { name: 'Корзина' });

    expect(cartLink).toBeInTheDocument();
    expect(cartLink.getAttribute('href')).toEqual(AppRoute.Cart);
  });
  test('counter should render quantity of items in cart', () => {
    const state = getStateWithItems({ cartItems: { 1: mockCarProduct } });
    renderWithContext(<HeaderCartLink />, state);

    const cartCounter = screen.getByTestId('product-count');

    expect(cartCounter).toBeInTheDocument();
    expect(cartCounter.textContent).toEqual(mockCarProduct.quantity.toString());
  });
  test('counter not should be render if cart is empty', () => {
    renderWithContext(<HeaderCartLink />);

    expect(screen.queryByTestId('product-count')).not.toBeInTheDocument();
  });
});
