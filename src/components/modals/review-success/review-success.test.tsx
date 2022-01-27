import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import ReviewSuccess from './review-success';
import { renderWithContext } from '../../../utils/test-utils';

describe('Component: ReviewSuccess', () => {
  test('should be render correctly', () => {
    renderWithContext(<ReviewSuccess onCloseModal={jest.fn()} isFormReviewSuccessOpen />);

    expect(screen.getByTestId('modal-success-icon')).toBeInTheDocument();
    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /К покупкам/i })).toBeInTheDocument();
  });
  test('should be close when click on button', () => {
    const mockOnCloseModal = jest.fn();

    renderWithContext(<ReviewSuccess onCloseModal={mockOnCloseModal} isFormReviewSuccessOpen />);

    const closeButton = screen.getByRole('button', { name: /К покупкам/i });

    userEvent.click(closeButton);
    expect(mockOnCloseModal).toBeCalled();
  });
});
