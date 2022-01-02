import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../utils/test-utils';
import Alert from './alert';

describe('Component: Alert', () => {
  test('should render correctly', () => {
    const mockOnClose = jest.fn();

    renderWithContext(
      <Alert isOpen onClose={mockOnClose}>
        fake text
      </Alert>,
    );

    expect(screen.getByText('fake text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Закрыть уведомление' })).toBeInTheDocument();
  });
  test('should be call callback on click close button', async () => {
    const mockOnClose = jest.fn();
    renderWithContext(
      <Alert isOpen onClose={mockOnClose}>
        fake text
      </Alert>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
