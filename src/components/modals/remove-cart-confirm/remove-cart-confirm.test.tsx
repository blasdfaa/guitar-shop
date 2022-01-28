import { fireEvent, screen } from '@testing-library/react';

import { renderWithContext } from '../../../utils/test-utils';
import { generateCartGuitar } from '../../../utils/mocks';
import RemoveCartConfirm from './remove-cart-confirm';

const mockCartGuitar = generateCartGuitar();
const mockOnCloseConfirmRemove = jest.fn();

describe('Component: RemoveCartConfirm', () => {
  test('should be render product info correctly if modal opened', () => {
    renderWithContext(
      <RemoveCartConfirm onCloseConfirmRemove={mockOnCloseConfirmRemove} {...mockCartGuitar} />,
    );

    const productImg = screen.getByRole('img', { name: mockCartGuitar.name });

    expect(
      screen.getByRole('heading', { level: 2, name: /Удалить этот товар/i }),
    ).toBeInTheDocument();
    expect(productImg).toBeInTheDocument();
    expect(productImg.getAttribute('src')).toEqual(mockCartGuitar.previewImg);
    expect(productImg.getAttribute('srcSet')).toEqual(`${mockCartGuitar.previewImg} 2x`);
    expect(
      screen.getByRole('heading', { level: 3, name: mockCartGuitar.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${mockCartGuitar.vendorCode}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCartGuitar.type}, ${mockCartGuitar.stringCount} струнная`),
    ).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockCartGuitar.price.toLocaleString()} ₽`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Удалить товар/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Продолжить покупки/i })).toBeInTheDocument();
  });
  test('should be close when click on continue button', () => {
    renderWithContext(
      <RemoveCartConfirm onCloseConfirmRemove={mockOnCloseConfirmRemove} {...mockCartGuitar} />,
    );

    const continueButton = screen.getByRole('button', { name: /Продолжить покупки/i });

    fireEvent.click(continueButton);

    expect(mockOnCloseConfirmRemove).toBeCalled();
  });
  test('should be close when click on delete product button', () => {
    renderWithContext(
      <RemoveCartConfirm onCloseConfirmRemove={mockOnCloseConfirmRemove} {...mockCartGuitar} />,
    );

    const continueButton = screen.getByRole('button', { name: /Продолжить покупки/i });

    fireEvent.click(continueButton);

    expect(mockOnCloseConfirmRemove).toBeCalled();
  });
});
