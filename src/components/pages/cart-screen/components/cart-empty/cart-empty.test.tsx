import { fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import CartEmpty from './cart-empty';
import { renderWithContext } from '../../../../../utils/test-utils';

const history = createMemoryHistory();

describe('Component: CartEmpty', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should be render correctly', () => {
    renderWithContext(<CartEmpty />);

    expect(screen.getByRole('heading', { level: 2, name: /Корзина пустая/i })).toBeInTheDocument();
    expect(screen.getByText(/Вероятней всего, вы ничего не заказали/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Для того, чтобы сделать заказ, перейди на главную страницу/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Вернуться на главную/i })).toBeInTheDocument();
  });
  test('should navigate to main page when click on back to home button', () => {
    history.push('/fake-cart');

    renderWithContext(<CartEmpty />, undefined, history);

    const backToHomeButton = screen.getByRole('link', { name: /Вернуться на главную/i });

    fireEvent.click(backToHomeButton);

    expect(history.location.pathname).toEqual('/');
  });
});
