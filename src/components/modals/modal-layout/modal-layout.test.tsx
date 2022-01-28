import { fireEvent, screen } from '@testing-library/react';

import ModalLayout from './modal-layout';
import { renderWithContext } from '../../../utils/test-utils';

const mockOnClose = jest.fn();

describe('Component: ModalLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
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
    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    expect(document.body).toHaveClass('scroll-lock scroll-lock-ios');
  });
  test("should call 'onClose' by click on close button", async () => {
    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    const closeButton = screen.getByRole('button', { name: 'Закрыть' });

    fireEvent.click(closeButton);

    expect(mockOnClose).toBeCalled();
  });
  test("should call 'onClose' by click on overlay", () => {
    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    const overlay = screen.getByTestId('modal-overlay');

    fireEvent.click(overlay);

    expect(mockOnClose).toBeCalled();
  });
  test("should call 'onClose' by keypress Escape", () => {
    renderWithContext(
      <ModalLayout onClose={mockOnClose}>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });

    expect(mockOnClose).toBeCalled();
  });
});
