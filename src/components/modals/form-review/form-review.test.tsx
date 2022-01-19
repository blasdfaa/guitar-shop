import { fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../../utils/test-utils';
import FormReview from './form-review';
import api from '../../../store/api';
import { postReview } from '../../../store/product/product.async';
import { getStateWithItems } from '../../../utils/mocks';
import { APIEndpoint } from '../../../constants';

const RATING_STARS_COUNT = 5;

describe('Component: FormReview', () => {
  test('should be render correctly', () => {
    const mockProduct = {
      productId: 1,
      productName: 'fake product',
    };

    renderWithContext(
      <FormReview
        onReviewSuccess={jest.fn()}
        onCloseForm={jest.fn()}
        productName={mockProduct.productName}
        productId={mockProduct.productId}
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Оставить отзыв/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: mockProduct.productName })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Ваше Имя/i })).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toEqual(RATING_STARS_COUNT);
    expect(screen.getByRole('textbox', { name: /Достоинства/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Недостатки/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Комментарий/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Отправить отзыв/i })).toBeInTheDocument();
  });
  test('should be render error messages if submit empty form', async () => {
    const mockOnReviewSuccess = jest.fn();

    renderWithContext(<FormReview onReviewSuccess={mockOnReviewSuccess} onCloseForm={jest.fn()} />);

    fireEvent.submit(screen.getByRole('button', { name: /Отправить отзыв/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId('field-warning')).toHaveLength(4);
    });
    await waitFor(() => {
      expect(mockOnReviewSuccess).not.toBeCalled();
    });
  });
  test('should be correctly submit form', async () => {
    const state = getStateWithItems();
    const fakeInputText = 'fake text';
    const mockReviewPost = {
      guitarId: 1,
      userName: fakeInputText,
      rating: 1,
      advantage: fakeInputText,
      comment: fakeInputText,
      disadvantage: fakeInputText,
    };

    const { store } = renderWithContext(
      <FormReview onReviewSuccess={jest.fn()} onCloseForm={jest.fn()} />,
      state,
    );

    const mockSendReview = jest.spyOn(api, 'post').mockResolvedValue({});

    const starsInput = screen.getAllByRole('radio');
    const nameInput = screen.getByRole('textbox', { name: /Ваше Имя/i }) as HTMLInputElement;
    const advantagesInput = screen.getByRole('textbox', { name: /Достоинства/i }) as HTMLInputElement;
    const disadvantagesInput = screen.getByRole('textbox', { name: /Недостатки/i }) as HTMLInputElement;
    const commentsInput = screen.getByRole('textbox', { name: /Комментарий/i }) as HTMLInputElement;

    fireEvent.click(starsInput[0]);

    userEvent.type(nameInput, fakeInputText);
    expect(nameInput.value).toEqual(fakeInputText);

    userEvent.type(advantagesInput, fakeInputText);
    expect(advantagesInput.value).toEqual(fakeInputText);

    userEvent.type(disadvantagesInput, fakeInputText);
    expect(disadvantagesInput.value).toEqual(fakeInputText);

    userEvent.type(commentsInput, fakeInputText);
    expect(commentsInput.value).toEqual(fakeInputText);

    fireEvent.submit(screen.getByRole('button', { name: /Отправить отзыв/i }));

    await store.dispatch(postReview(mockReviewPost));

    await waitFor(() => {
      expect(mockSendReview).toBeCalled();
    });
    await waitFor(() => {
      expect(mockSendReview).toHaveBeenCalledWith(`/${APIEndpoint.Reviews}`, mockReviewPost);
    });
  });
});
