import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../../utils/test-utils';
import ModalLayout from './modal-layout';

describe('Component: ModalLayout', () => {
  test('should render correctly', () => {
    const mockOnClose = jest.fn();

    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    expect(screen.getByTestId('modal-layout')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
    expect(screen.getByText('Fake modal content')).toBeInTheDocument();
  });
  test('should be body scroll lock if modal open', () => {
    const mockOnClose = jest.fn();

    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    expect(document.body).toHaveClass('scroll-lock scroll-lock-ios');
  });
  test("should call 'onClose' by click on close button", () => {
    const mockOnClose = jest.fn();

    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    const closeButton = screen.getByRole('button', { name: 'Закрыть' });

    userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
  test("should call 'onClose' by click on overlay", () => {
    const mockOnClose = jest.fn();

    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    const overlay = screen.getByTestId('modal-overlay');

    userEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });
  test("should call 'onClose' by keypress Escape", () => {
    const mockOnClose = jest.fn();

    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
