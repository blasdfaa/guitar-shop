import { screen, within } from '@testing-library/react';
import React from 'react';

import AppHeader from './app-header';
import { renderWithContext } from '../../utils/test-utils';

describe('Component: AppHeader', () => {
  test('should render correctly', () => {
    renderWithContext(<AppHeader />);

    const navigation = screen.getByTestId('navigation-list');
    const navigationList = within(navigation);
    const navigationItem = navigationList.getAllByRole('listitem');
    const navigationLink = navigationList.getAllByRole('link');

    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByAltText('Логотип')).toBeInTheDocument();

    expect(navigationItem.length).toBe(3);
    expect(navigationLink.length).toBe(3);

    expect(screen.getByRole('link', { name: 'Корзина' })).toBeInTheDocument();
    expect(screen.getByLabelText('Корзина')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
