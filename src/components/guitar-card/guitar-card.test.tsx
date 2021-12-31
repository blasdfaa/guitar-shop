import { screen } from '@testing-library/react';

import { generateGuitarItem } from '../../utils/mocks';
import { renderWithContext } from '../../utils/test-utils';
import GuitarCard from './guitar-card';

describe('Component: GuitarCard', () => {
  const expectedGuitar = generateGuitarItem();

  test('should render correctly', () => {
    renderWithContext(<GuitarCard {...expectedGuitar} />);

    expect(screen.getByAltText(expectedGuitar.name)).toBeInTheDocument();
    expect(screen.getByTestId('card-price').textContent).toEqual(`Цена:${expectedGuitar.price} ₽`);
    expect(screen.getAllByRole('link').length).toEqual(2);
  });
});
