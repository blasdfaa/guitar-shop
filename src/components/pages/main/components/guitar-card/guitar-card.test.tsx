import { screen } from '@testing-library/react';

import {
  generateCartProduct,
  generateGuitarItem,
  getStateWithItems,
} from '../../../../../utils/mocks';
import { renderWithContext } from '../../../../../utils/test-utils';
import GuitarCard from './guitar-card';

describe('Component: GuitarCard', () => {
  const expectedGuitar = generateGuitarItem();
  const mockCartProduct = generateCartProduct();

  test('should render correctly', () => {
    renderWithContext(<GuitarCard {...expectedGuitar} />);

    expect(screen.getByAltText(expectedGuitar.name)).toBeInTheDocument();
    expect(screen.getByTestId('card-price').textContent).toEqual(
      `Цена:${expectedGuitar.price.toLocaleString()} ₽`,
    );
    expect(screen.getByRole('link', { name: /Подробнее/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Купить/i })).toBeInTheDocument();
  });
  test('should render "In cart" link if item is in cart', () => {
    const state = getStateWithItems({ cartItems: { [expectedGuitar.id]: mockCartProduct } });
    renderWithContext(<GuitarCard {...expectedGuitar} />, state);

    expect(screen.getByAltText(expectedGuitar.name)).toBeInTheDocument();
    expect(screen.getByTestId('card-price').textContent).toEqual(
      `Цена:${expectedGuitar.price.toLocaleString()} ₽`,
    );
    expect(screen.getByRole('link', { name: /Подробнее/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /В корзине/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Купить/i })).not.toBeInTheDocument();
  });
});
