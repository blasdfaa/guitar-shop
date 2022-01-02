import { screen, waitFor } from '@testing-library/react';

import { generateGuitarItem, getStateWithItems } from '../../utils/mocks';
import { renderWithContext } from '../../utils/test-utils';
import GuitarList from './guitar-list';
import { fetchGuitarsWithParams } from '../../store/guitar/guitar.async';
import api from '../../store/api';
import React from 'react';

describe('Component: GuitarList', () => {
  const expectedGuitars = [generateGuitarItem(), generateGuitarItem(), generateGuitarItem()];

  test('initial fetch should be called once', async () => {
    const state = getStateWithItems();
    const { store } = renderWithContext(<GuitarList />, state);

    jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve({ data: expectedGuitars, headers: {} }));

    await store.dispatch(fetchGuitarsWithParams());
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getAllByAltText(/fake guitar/i).length).toEqual(expectedGuitars.length),
    );
  });
  test('should be render text if return 0 items', async () => {
    const state = getStateWithItems();
    const { store } = renderWithContext(<GuitarList />, state);

    jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve({ data: [], headers: {} }));

    await store.dispatch(fetchGuitarsWithParams());

    expect(screen.getByText('Товары не найдены')).toBeInTheDocument();
  });
});
