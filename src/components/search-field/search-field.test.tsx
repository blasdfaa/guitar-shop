import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../utils/test-utils';
import SearchField from './search-field';
import {
  generateGuitarItem,
  generateSearchedGuitars,
  getStateWithItems,
} from '../../utils/mocks';
import api from '../../store/api';
import { fetchGuitarsByName } from '../../store/search/search.async';

describe('Component: SearchField', () => {
  const expectedGuitars = [
    generateGuitarItem(),
    generateGuitarItem(),
    generateGuitarItem(),
  ];

  test('should render entered text correctly', () => {
    renderWithContext(<SearchField />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'fake');

    expect(input.value).toEqual('fake');

    userEvent.type(input, 'f');

    expect(input.value).toEqual('fakef');
  });
  test('dropdown should not be opened if value is empty', () => {
    renderWithContext(<SearchField />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, '');

    expect(screen.queryByTestId('search-dropdown')).not.toBeInTheDocument();
  });
  test('dropdown should display empty text if no items were found', async () => {
    const { store } = renderWithContext(<SearchField />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve({ data: [], headers: {} }));
    userEvent.type(input, 'fake');

    await store.dispatch(fetchGuitarsByName('fake'));

    expect(screen.getByText('Ничего не найдено')).toBeInTheDocument();
  });
  test('dropdown should display loader if items is loading', async () => {
    const { store } = renderWithContext(<SearchField />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));
    userEvent.type(input, 'fake');

    store.dispatch(fetchGuitarsByName('fake'));

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  test('dropdown should be opened if items found', async () => {
    const { store } = renderWithContext(<SearchField />);

    jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));

    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.type(input, 'fake');

    const dropdown = screen.getByTestId('search-dropdown');
    const dropdownList = within(dropdown);

    await store.dispatch(fetchGuitarsByName('fake'));

    const dropdownListItems = dropdownList.getAllByRole('listitem');

    expect(dropdownListItems.length).toEqual(expectedGuitars.length);
    expect(dropdown).toBeInTheDocument();
  });
  test('requests must match the number of letters', async () => {
    const state = getStateWithItems(expectedGuitars);
    renderWithContext(<SearchField />, state);

    jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'fake');
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(input.value.length));

    userEvent.type(input, 'fake1');
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(input.value.length));
  });
  test('searching result should be sorted by first letter of search value', async () => {
    const mockSearchedGuitars = [
      generateSearchedGuitars('BCA'),
      generateSearchedGuitars('BAC'),
      generateSearchedGuitars('ABC'),
    ];
    const correctSortedExpectedResult = ['ABC', 'BAC', 'BCA'];
    renderWithContext(<SearchField />);

    jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve({ data: mockSearchedGuitars, headers: {} }),
      );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'A');

    await waitFor(() => {
      const searchResult = screen
        .getAllByRole('listitem')
        .map((item) => item.textContent);
      expect(searchResult).toEqual(correctSortedExpectedResult);
    });
  });
  test('dropdown should be close by click outside', () => {
    renderWithContext(<SearchField />);

    jest.spyOn(api, 'get').mockResolvedValue({ data: expectedGuitars, headers: {} });

    const searchInput = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(searchInput, 'fake');
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();

    userEvent.click(document.body);
    expect(screen.queryByTestId('search-dropdown')).not.toBeInTheDocument();
  });
  test('dropdown not should be close by click on input', () => {
    renderWithContext(<SearchField />);

    jest.spyOn(api, 'get').mockResolvedValue({ data: expectedGuitars, headers: {} });

    const searchInput = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.type(searchInput, 'fake');
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();

    userEvent.click(searchInput);
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
  });
});
