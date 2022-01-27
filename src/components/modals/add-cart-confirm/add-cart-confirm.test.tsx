import { fireEvent, screen } from '@testing-library/react';

import AddCartConfirm from './add-cart-confirm';
import { renderWithContext } from '../../../utils/test-utils';
import { generateCartGuitar } from '../../../utils/mocks';

import type { CartGuitar } from '../../../types/guitar';

const mockCartGuitar: CartGuitar = generateCartGuitar();
const mockOnCloseConfirm = jest.fn();
const mockOnOpenSuccess = jest.fn();
const mockOnConfirmButtonCustomCallback = jest.fn();

describe('Component AddCartConfirm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should be render product info correctly if modal opened', () => {
    const mockIsAddCartConfirm = true;

    renderWithContext(
      <AddCartConfirm
        {...mockCartGuitar}
        onCloseConfirmModal={mockOnCloseConfirm}
        onOpenSuccessModal={mockOnOpenSuccess}
        isAddCartConfirmOpen={mockIsAddCartConfirm}
      />,
    );

    const productImg = screen.getByRole('img', { name: mockCartGuitar.name });

    expect(
      screen.getByRole('heading', { level: 2, name: /Добавить товар в корзину/i }),
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
    expect(screen.getByRole('button', { name: /Добавить в корзину/i })).toBeInTheDocument();
  });
  test('should close modal and open success modal when click on add to cart button', () => {
    const mockIsAddCartConfirmOpen = true;

    renderWithContext(
      <AddCartConfirm
        {...mockCartGuitar}
        onCloseConfirmModal={mockOnCloseConfirm}
        onOpenSuccessModal={mockOnOpenSuccess}
        isAddCartConfirmOpen={mockIsAddCartConfirmOpen}
      />,
    );

    const addToCartButton = screen.getByRole('button', { name: /Добавить в корзину/i });

    fireEvent.click(addToCartButton);

    expect(mockOnCloseConfirm).toBeCalled();
    expect(mockOnOpenSuccess).toBeCalled();
  });
  test('should call custom callback if it exists, close modal and open success modal when click on add to cart button', () => {
    const mockIsAddCartConfirmOpen = true;

    renderWithContext(
      <AddCartConfirm
        {...mockCartGuitar}
        onConfirmButtonCustomCallback={mockOnConfirmButtonCustomCallback}
        onCloseConfirmModal={mockOnCloseConfirm}
        onOpenSuccessModal={mockOnOpenSuccess}
        isAddCartConfirmOpen={mockIsAddCartConfirmOpen}
      />,
    );

    const addToCartButton = screen.getByRole('button', { name: /Добавить в корзину/i });

    fireEvent.click(addToCartButton);

    expect(mockOnCloseConfirm).toBeCalled();
    expect(mockOnOpenSuccess).toBeCalled();
    expect(mockOnConfirmButtonCustomCallback).toBeCalled();
  });
});
