import { fireEvent, screen } from '@testing-library/react';

import { renderWithContext } from '../../../utils/test-utils';
import AddCartSuccess from './add-cart-success';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const mockOnCloseSuccess = jest.fn();

describe('Component: AddCartSuccess', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should be render correctly add to cart success message', () => {
    const mockIsAddCartSuccessOpen = true;

    renderWithContext(
      <AddCartSuccess
        isAddCartSuccessOpen={mockIsAddCartSuccessOpen}
        onCloseSuccessModal={mockOnCloseSuccess}
      />,
    );

    expect(screen.getByTestId('icon-success-modal')).toBeInTheDocument();
    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Перейти в корзину/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Продолжить покупки/i })).toBeInTheDocument();
  });
  test('should close modal when click on continue button', () => {
    const mockIsAddCartSuccessOpen = true;

    renderWithContext(
      <AddCartSuccess
        isAddCartSuccessOpen={mockIsAddCartSuccessOpen}
        onCloseSuccessModal={mockOnCloseSuccess}
      />,
    );

    const closeButton = screen.getByRole('button', { name: /Закрыть/i });

    fireEvent.click(closeButton);

    expect(mockOnCloseSuccess).toBeCalled();
  });
  test('should navigate to cart when click on go to cart button', () => {
    const FAKE_CART_ROUTE = '/fake-cart-route';
    const mockIsAddCartSuccessOpen = true;
    const mockOnCloseSuccessWithNavigate = jest.fn(() => {
      history.push(FAKE_CART_ROUTE);
    });

    renderWithContext(
      <AddCartSuccess
        isAddCartSuccessOpen={mockIsAddCartSuccessOpen}
        onCloseSuccessModal={mockOnCloseSuccessWithNavigate}
      />,
      undefined,
      history,
    );

    const goToCartButton = screen.getByRole('button', { name: /Перейти в корзину/i });

    fireEvent.click(goToCartButton);

    expect(mockOnCloseSuccessWithNavigate).toBeCalled();
    expect(history.location.pathname).toEqual(FAKE_CART_ROUTE);
  });
  test('should navigate to custom route when click on continue button', async () => {
    const CUSTOM_FAKE_ROUTE = '/custom-fake-route';
    const mockIsAddCartSuccessOpen = true;
    const mockOnCloseSuccessWithNavigate = jest.fn(() => {
      history.push(CUSTOM_FAKE_ROUTE);
    });

    renderWithContext(
      <AddCartSuccess
        routeAfterSuccess
        routeTo={CUSTOM_FAKE_ROUTE}
        isAddCartSuccessOpen={mockIsAddCartSuccessOpen}
        onCloseSuccessModal={mockOnCloseSuccessWithNavigate}
      />,
      undefined,
      history,
    );

    const continueButton = screen.getByRole('button', { name: /Продолжить покупки/i });

    fireEvent.click(continueButton);

    expect(mockOnCloseSuccessWithNavigate).toBeCalled();
    expect(history.location.pathname).toEqual(CUSTOM_FAKE_ROUTE);
  });
});
