import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../utils/test-utils';
import CatalogFilter from './catalog-filter';
import { FilterGuitarType } from '../../constants';

describe('Component: CatalogFilter', () => {
  const mockCheckboxTypeItems = {
    items: [
      {
        id: 1,
        value: FilterGuitarType.Acoustic,
        label: 'Акустические гитары',
        matchingStrings: [6, 7, 12],
      },
      {
        id: 2,
        value: FilterGuitarType.Electric,
        label: 'Электрогитары',
        matchingStrings: [4, 6, 7],
      },
      {
        id: 3,
        value: FilterGuitarType.Ukulele,
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
  test('checked input by click on guitars type', async () => {
    jest.spyOn(URLSearchParams.prototype, 'getAll').mockReturnValue(['acoustic']);

    renderWithContext(<CatalogFilter />);

    const typeCheckbox = screen.getByRole('checkbox', { name: 'Акустические гитары' });

    userEvent.click(typeCheckbox);
    expect(typeCheckbox).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Акустические гитары' })).toBeInTheDocument();
  });
  test('checked input by click on strings count', async () => {
    jest.spyOn(URLSearchParams.prototype, 'getAll').mockReturnValue(['4']);

    const { history } = renderWithContext(<CatalogFilter />);

    const stringsCountCheckbox = screen.getByRole('checkbox', { name: '4' });

    userEvent.click(stringsCountCheckbox);
    expect(stringsCountCheckbox).toBeChecked();
    expect(screen.getByRole('checkbox', { name: '4' })).toBeInTheDocument();

    history.location.search = '';
  });
  test('unavailable strings count should be disabled', () => {
    jest.spyOn(URLSearchParams.prototype, 'getAll').mockReturnValue([]);

    const { history } = renderWithContext(<CatalogFilter />);

    const typeCheckbox = screen.getByRole('checkbox', { name: 'Акустические гитары' });

    userEvent.click(typeCheckbox);
    expect(screen.getByRole('checkbox', { name: '4' })).toBeDisabled();

    userEvent.click(typeCheckbox);
    expect(screen.getByRole('checkbox', { name: '4' })).not.toBeDisabled();

    history.location.search = '';
  });
  test('should set correctly url params by selected value', () => {
    jest.spyOn(URLSearchParams.prototype, 'getAll').mockReturnValue(['acoustic']);
    const { history } = renderWithContext(<CatalogFilter />);

    const typeCheckbox = screen.getByRole('checkbox', { name: mockCheckboxTypeItems.items[0].label });

    userEvent.click(typeCheckbox);
    expect(history.location.search).toEqual(`?type=${mockCheckboxTypeItems.items[0].value}`);

    history.location.search = '';
  });
  test('should delete disabled params from url string', () => {
    jest
      .spyOn(URLSearchParams.prototype, 'getAll')
      .mockReturnValueOnce(['acoustic'])
      .mockReturnValueOnce(['12'])
      .mockReturnValue([]);

    const { history } = renderWithContext(<CatalogFilter />);

    const stringsCountCheckbox = screen.getByRole('checkbox', { name: '12' });
    userEvent.click(stringsCountCheckbox);

    const typeCheckbox = screen.getByRole('checkbox', { name: 'Акустические гитары' });
    userEvent.click(typeCheckbox);

    expect(history.location.search).toEqual('?type=acoustic');

    history.location.search = '';
  });
});
