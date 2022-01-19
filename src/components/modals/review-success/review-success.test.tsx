import { renderWithContext } from '../../../utils/test-utils';
import ReviewSuccess from './review-success';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewSuccess', () => {
  test('should be render correctly', () => {
    renderWithContext(<ReviewSuccess onCloseModal={jest.fn()} />);

    expect(screen.getByTestId('modal-success-icon')).toBeInTheDocument();
    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /К покупкам/i })).toBeInTheDocument();
  });
  test('should be close when click on button', () => {
    const mockOnCloseModal = jest.fn();

    renderWithContext(<ReviewSuccess onCloseModal={mockOnCloseModal} />);

    const closeButton = screen.getByRole('button', { name: /К покупкам/i });

    userEvent.click(closeButton);
    expect(mockOnCloseModal).toBeCalled();
  });
});
