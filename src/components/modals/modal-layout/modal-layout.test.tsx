import { fireEvent, screen } from '@testing-library/react';

import { renderWithContext } from '../../../utils/test-utils';
import ModalLayout from './modal-layout';

const mockOnClose = jest.fn();

describe('Component: ModalLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    renderWithContext(
      <ModalLayout onClose={mockOnClose} isShow>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    expect(screen.getByTestId('modal-layout')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
    expect(screen.getByText('Fake modal content')).toBeInTheDocument();
  });
  test("should call 'onClose' by click on close button", () => {
    renderWithContext(
      <ModalLayout onClose={mockOnClose} isShow>
        <div>Fake modal content</div>
      </ModalLayout>,
    );

    const closeButton = screen.getByRole('button', { name: 'Закрыть' });

    fireEvent.click(closeButton);

    expect(mockOnClose).toBeCalled();
  });
  // test("should call 'onClose' by click on overlay", () => {
  //   renderWithContext(
  //     <ModalLayout onClose={mockOnClose} isShow>
  //       <div>Fake modal content</div>
  //     </ModalLayout>,
  //   );
  //
  //   const overlay = screen.getByTestId('modal-overlay');
  //
  //   fireEvent.click(overlay);
  //
  //   expect(mockOnClose).toBeCalled();
  // });
  // test("should call 'onClose' by keypress Escape", () => {
  //   renderWithContext(
  //     <ModalLayout onClose={mockOnClose} isShow>
  //       <div>Fake modal content</div>
  //     </ModalLayout>,
  //   );
  //
  //   fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
  //
  //   expect(mockOnClose).toBeCalled();
  // });
});
