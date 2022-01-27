import { fireEvent, screen } from '@testing-library/react';

import CartItem from './cart-item';
import { renderWithContext } from '../../../../../utils/test-utils';
import {
  generateCartGuitar,
  generateCartProduct,
  getStateWithItems,
} from '../../../../../utils/mocks';
import { formatGuitarType } from '../../../../../utils/product';

const mockCartGuitar = generateCartGuitar();
const mockCartProduct = generateCartProduct();

describe('Component: CartIem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should be render correctly product', () => {
    renderWithContext(<CartItem {...mockCartGuitar} />);

    const productImg = screen.getByRole('img', { name: mockCartGuitar.name });

    expect(screen.getByRole('button', { name: /Удалить/i })).toBeInTheDocument();
    expect(productImg).toBeInTheDocument();
    expect(productImg.getAttribute('src')).toEqual(mockCartGuitar.previewImg);
    expect(productImg.getAttribute('srcSet')).toEqual(`${mockCartGuitar.previewImg} 2x`);
    expect(screen.getByText(mockCartGuitar.name)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${formatGuitarType(mockCartGuitar.type)}, ${mockCartGuitar.stringCount} струнная`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockCartGuitar.price.toLocaleString()} ₽`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Уменьшить количество/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Увеличить количество/i })).toBeInTheDocument();
  });
  test('should open remove confirm modal when click on remove button', () => {
    renderWithContext(<CartItem {...mockCartGuitar} />);

    const removeItemButton = screen.getByRole('button', { name: /Удалить/i });

    fireEvent.click(removeItemButton);

    expect(screen.getByTestId('modal-layout')).toBeInTheDocument();
  });
  test('should increase product quantity when click on decrease button', () => {
    const state = getStateWithItems({
      cartItems: { [mockCartGuitar.id]: mockCartProduct },
    });

    const { store } = renderWithContext(<CartItem {...mockCartGuitar} />, state);

    const decreaseButton = screen.getByRole('button', { name: /Увеличить количество/i });

    expect(store.getState().CART.itemsQuantity).toEqual(mockCartProduct.quantity);

    fireEvent.click(decreaseButton);

    expect(store.getState().CART.itemsQuantity).toEqual(mockCartProduct.quantity + 1);
  });
  test('should decrease product quantity when click on decrease button', () => {
    const state = getStateWithItems({
      cartItems: { [mockCartGuitar.id]: mockCartProduct },
    });

    const { store } = renderWithContext(<CartItem {...mockCartGuitar} />, state);

    const decreaseButton = screen.getByRole('button', { name: /Уменьшить количество/i });

    expect(store.getState().CART.itemsQuantity).toEqual(mockCartProduct.quantity);

    fireEvent.click(decreaseButton);

    expect(store.getState().CART.itemsQuantity).toEqual(mockCartProduct.quantity - 1);
  });
  test('should change product quantity when input value', () => {
    const expectedQuantityValue = 30;
    const state = getStateWithItems({
      cartItems: { [mockCartGuitar.id]: mockCartProduct },
    });

    const { store } = renderWithContext(<CartItem {...mockCartGuitar} />, state);

    const changeQuantityInput = screen.getByRole('spinbutton');

    expect(store.getState().CART.itemsQuantity).toEqual(mockCartProduct.quantity);

    fireEvent.input(changeQuantityInput, { target: { value: expectedQuantityValue } });

    expect(store.getState().CART.itemsQuantity).toEqual(expectedQuantityValue);
  });
});
