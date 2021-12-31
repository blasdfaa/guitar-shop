import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../utils/test-utils';
import CatalogFilter, { FilterGuitarTypes } from './catalog-filter';

describe('Component: CatalogFilter', () => {
  const mockCheckboxTypeItems = {
    items: [
      {
        id: 1,
        value: FilterGuitarTypes.Acoustic,
        label: 'Акустические гитары',
        matchingStrings: [6, 7, 12],
      },
      {
        id: 2,
        value: FilterGuitarTypes.Electric,
        label: 'Электрогитары',
        matchingStrings: [4, 6, 7],
      },
      {
        id: 3,
        value: FilterGuitarTypes.Ukulele,
        label: 'Укулеле',
        matchingStrings: [4],
      },
    ],
    selected: [],
    availableStrings: [],
  };

  const mockCheckboxStringsCountItems = [
    { id: 1, value: 4 },
    { id: 2, value: 6 },
    { id: 3, value: 7 },
    { id: 4, value: 12 },
  ];

  test('should render correctly', () => {
    renderWithContext(<CatalogFilter />);

    expect(screen.getByRole('heading', { name: 'Фильтр' })).toBeInTheDocument();
    expect(screen.getAllByRole('group').length).toBe(3);
    expect(screen.getAllByRole('checkbox').length).toBe(
      mockCheckboxTypeItems.items.length + mockCheckboxStringsCountItems.length,
    );
  });
  test('toggle element by selecting checkbox', () => {
    renderWithContext(<CatalogFilter />);

    const typeCheckbox = screen.getByRole('checkbox', { name: 'Акустические гитары' });
    const stringsCountCheckbox = screen.getByRole('checkbox', { name: '4' });

    userEvent.click(typeCheckbox);
    expect(typeCheckbox).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Акустические гитары' })).toBeInTheDocument();

    userEvent.click(typeCheckbox);
    expect(typeCheckbox).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Акустические гитары' })).toBeInTheDocument();

    userEvent.click(stringsCountCheckbox);
    expect(stringsCountCheckbox).toBeChecked();
    expect(screen.getByRole('checkbox', { name: '4' })).toBeInTheDocument();

    userEvent.click(stringsCountCheckbox);
    expect(stringsCountCheckbox).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: '4' })).toBeInTheDocument();
  });
  test('unavailable strings count should be disabled', () => {
    renderWithContext(<CatalogFilter />);

    const checkbox = screen.getByRole('checkbox', { name: 'Акустические гитары' });

    userEvent.click(checkbox);
    expect(screen.getByRole('checkbox', { name: '4' })).toBeDisabled();

    userEvent.click(checkbox);
    expect(screen.getByRole('checkbox', { name: '4' })).not.toBeDisabled();
  });
  test('should set correctly url params by selected value', () => {
    const { history } = renderWithContext(<CatalogFilter />);

    const typeCheckbox = screen.getByRole('checkbox', { name: mockCheckboxTypeItems.items[0].label });

    userEvent.click(typeCheckbox);
    expect(history.location.search).toEqual(`?type=${mockCheckboxTypeItems.items[0].value}`);
  });
});
