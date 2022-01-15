import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../../../../utils/test-utils';
import CatalogPriceFilter from './catalog-price-filter';
import { generateGuitarItem, getStateWithItems } from '../../../../../utils/mocks';

describe('Component: CatalogPriceFilter', () => {
  test('should render correctly', () => {
    renderWithContext(<CatalogPriceFilter />);

    expect(screen.getByRole('group', { name: /Цена/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Минимальная цена' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Максимальная цена' })).toBeInTheDocument();
  });
  test('should not set a value if it is less', () => {
    renderWithContext(<CatalogPriceFilter />);

    const minPriceInput = screen.getByRole('spinbutton', { name: 'Минимальная цена' }) as HTMLInputElement;
    const maxPriceInput = screen.getByRole('spinbutton', { name: 'Максимальная цена' }) as HTMLInputElement;

    userEvent.type(minPriceInput, '0');
    expect(minPriceInput.value).toEqual('');

    userEvent.type(maxPriceInput, '0');
    expect(maxPriceInput.value).toEqual('');
  });
  test('placeholder should be equal min/max price', () => {
    const state = getStateWithItems([generateGuitarItem(), generateGuitarItem()]);
    renderWithContext(<CatalogPriceFilter />, state);

    const prices = {
      min: Math.min(...state.GUITARS.items.map((guitar) => guitar.price)),
      max: Math.max(...state.GUITARS.items.map((guitar) => guitar.price)),
    };

    const minPriceInput = screen.getByRole('spinbutton', { name: 'Минимальная цена' }) as HTMLInputElement;
    const maxPriceInput = screen.getByRole('spinbutton', { name: 'Максимальная цена' }) as HTMLInputElement;

    expect(Number(minPriceInput.placeholder)).toBe(prices.min);
    expect(Number(maxPriceInput.placeholder)).toBe(prices.max);
  });
  test('should set min/max price if value is less/greater min/max guitars price', () => {
    const state = getStateWithItems([generateGuitarItem(), generateGuitarItem()]);
    renderWithContext(<CatalogPriceFilter />, state);

    const prices = {
      min: Math.min(...state.GUITARS.items.map((guitar) => guitar.price)),
      max: Math.max(...state.GUITARS.items.map((guitar) => guitar.price)),
    };

    const minPriceInput = screen.getByRole('spinbutton', { name: 'Минимальная цена' }) as HTMLInputElement;
    const maxPriceInput = screen.getByRole('spinbutton', { name: 'Максимальная цена' }) as HTMLInputElement;

    userEvent.type(minPriceInput, String(prices.min - 10));
    minPriceInput.blur();
    expect(minPriceInput.value).toBe(String(prices.min));

    userEvent.type(maxPriceInput, String(prices.max + 10));
    maxPriceInput.blur();
    expect(maxPriceInput.value).toBe(String(prices.max));
  });
});
