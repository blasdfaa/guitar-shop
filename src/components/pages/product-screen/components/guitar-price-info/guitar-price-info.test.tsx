import { fireEvent, screen } from '@testing-library/react';

import GuitarPriceInfo from './guitar-price-info';
import { renderWithContext } from '../../../../../utils/test-utils';
import { generateCartGuitar } from '../../../../../utils/mocks';

const mockGuitar = generateCartGuitar();

describe('Component: GuitarPriceInfo', () => {
  test('should render correctly', () => {
    renderWithContext(<GuitarPriceInfo guitar={mockGuitar} />);

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockGuitar.price.toLocaleString()} ₽`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Добавить в корзину/i })).toBeInTheDocument();
  });
  test('should open add confirm modal when click on add to cart button', () => {
    renderWithContext(<GuitarPriceInfo guitar={mockGuitar} />);

    const addToCartButton = screen.getByRole('button', { name: /Добавить в корзину/i });

    fireEvent.click(addToCartButton);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
