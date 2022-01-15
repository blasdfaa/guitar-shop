import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../../../../utils/test-utils';
import CatalogSort from './catalog-sort';
import { OrderOption, SortOption } from '../../../../../constants';

describe('Component: CatalogSort', () => {
  const mockSortingButtons = [
    { id: 1, value: SortOption.ByPrice, label: 'по цене' },
    { id: 2, value: SortOption.ByRating, label: 'по популярности' },
  ];

  const mockOrderButtons = [
    { id: 1, type: 'up', label: 'По возрастанию', value: OrderOption.Up },
    { id: 2, type: 'down', label: 'По убыванию', value: OrderOption.Down },
  ];

  test('should render correctly', () => {
    renderWithContext(<CatalogSort />);

    expect(screen.getByRole('button', { name: mockSortingButtons[0].label })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: mockSortingButtons[1].label })).toBeInTheDocument();
    expect(screen.getByLabelText(mockOrderButtons[0].label)).toBeInTheDocument();
    expect(screen.getByLabelText(mockOrderButtons[1].label)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Сортировать:' })).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(4);
  });
  test('should set correctly url params by selected value', () => {
    const { history } = renderWithContext(<CatalogSort />);

    const sortByPriceBtn = screen.getByRole('button', { name: mockSortingButtons[0].label });
    const sortByRatingBtn = screen.getByRole('button', { name: mockSortingButtons[1].label });

    userEvent.click(sortByPriceBtn);
    expect(history.location.search).toEqual(`?_sort=${mockSortingButtons[0].value}`);

    history.location.search = '';

    userEvent.click(sortByRatingBtn);
    expect(history.location.search).toEqual(`?_sort=${mockSortingButtons[1].value}&_order=desc`);

    history.location.search = '';
  });
  test('should set sort type price if the sort type is not selected and one arrows is pressed', () => {
    const { history } = renderWithContext(<CatalogSort />);

    const orderByUpBtn = screen.getByRole('button', { name: mockOrderButtons[0].label });
    const orderByDownBtn = screen.getByRole('button', { name: mockOrderButtons[1].label });

    userEvent.click(orderByUpBtn);
    expect(history.location.search).toEqual(
      `?_sort=${mockSortingButtons[0].value}&_order=${mockOrderButtons[0].value}`,
    );

    history.location.search = '';

    userEvent.click(orderByDownBtn);
    expect(history.location.search).toEqual(
      `?_sort=${mockSortingButtons[0].value}&_order=${mockOrderButtons[1].value}`,
    );

    history.location.search = '';
  });
});
