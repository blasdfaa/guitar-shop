import { screen } from '@testing-library/react';

import { generateGuitarItem, getStateWithItems } from '../../../utils/mocks';
import { renderWithContext } from '../../../utils/test-utils';
import ProductScreen from './product-screen';
import api from '../../../store/api';
import { fetchProductById } from '../../../store/product/product.async';

describe('Component: ProductScreen', () => {
  const state = getStateWithItems();
  const expectedProduct = generateGuitarItem();

  test('initial fetch should be called once', async () => {
    jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve({ data: expectedProduct, headers: {} }));

    const { store } = renderWithContext(<ProductScreen />, state);

    await store.dispatch(fetchProductById(1));

    expect(api.get).toHaveBeenCalledTimes(1);
  });
  test('should render product correctly', async () => {
    jest.spyOn(api, 'get').mockImplementation(() => Promise.resolve({ data: expectedProduct, headers: {} }));

    const { store } = renderWithContext(<ProductScreen />, state);

    await store.dispatch(fetchProductById(1));

    expect(
      screen.getByRole('heading', { level: 1, name: `Товар ${expectedProduct.name}` }),
    ).toBeInTheDocument();

    const productImage = screen.getByRole('img', { name: expectedProduct.name });
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', expectedProduct.previewImg);
    expect(productImage).toHaveAttribute('srcSet', `${expectedProduct?.previewImg} 2x`);

    expect(screen.getByRole('heading', { level: 2, name: expectedProduct.name })).toBeInTheDocument();
    expect(screen.getByTestId('product-rate-count').textContent).toEqual(
      expectedProduct.comments.length.toString(),
    );
    expect(screen.getByTestId('product-tabs')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText(`${expectedProduct.price} ₽`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Добавить в корзину' })).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});
