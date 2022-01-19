import { fireEvent, screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test-utils';
import RatingStarsControl from './rating-stars-control';

const RATING_STARS_COUNT = 5;

describe('Component: RatingStarsControl', () => {
  test('should render correctly', () => {
    const mockFieldState = { invalid: true, isTouched: true, isDirty: true };
    const mockOnChangeFormState = jest.fn();

    renderWithContext(
      <RatingStarsControl fieldState={mockFieldState} onChangeFormState={mockOnChangeFormState} />,
    );

    expect(screen.getAllByRole('radio', { checked: false }).length).toEqual(RATING_STARS_COUNT);
  });
  test('star should be checked after click on star', () => {
    const mockFieldState = { invalid: true, isTouched: false, isDirty: true };
    const mockOnChangeFormState = jest.fn();

    renderWithContext(
      <RatingStarsControl fieldState={mockFieldState} onChangeFormState={mockOnChangeFormState} />,
    );

    const starInput = screen.getAllByRole('radio');

    fireEvent.click(starInput[0]);

    expect(starInput[0]).toBeChecked();
    expect(mockOnChangeFormState).toHaveBeenCalled();
  });
});
