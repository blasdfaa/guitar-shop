import { generateProductTabInfo } from '../../../../../utils/mocks';
import { renderWithContext } from '../../../../../utils/test-utils';
import ProductsTabs from './products-tabs';
import { screen } from '@testing-library/react';
import { formatGuitarType } from '../../../../../utils/product';
import userEvent from '@testing-library/user-event';

describe('Component: ProductsTabs', () => {
  const expectedGuitarInfo = generateProductTabInfo();

  test('should render correctly', () => {
    renderWithContext(<ProductsTabs {...expectedGuitarInfo} />);

    expect(screen.getByRole('link', { name: 'Характеристики' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Описание' })).toBeInTheDocument();

    expect(screen.getByRole('cell', { name: 'Артикул:' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: expectedGuitarInfo.vendorCode })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Тип:' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: formatGuitarType(expectedGuitarInfo.type) })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Количество струн:' })).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: `${expectedGuitarInfo.stringCount} струнная` }),
    ).toBeInTheDocument();
  });
  test('should change tab by click', () => {
    renderWithContext(<ProductsTabs {...expectedGuitarInfo} />);

    const descriptionBtn = screen.getByRole('link', { name: 'Описание' });

    userEvent.click(descriptionBtn);
    expect(screen.getByText(`${expectedGuitarInfo.description}`)).toBeInTheDocument();
  });
});
