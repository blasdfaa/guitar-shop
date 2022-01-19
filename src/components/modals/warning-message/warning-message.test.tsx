import { renderWithContext } from '../../../utils/test-utils';
import WarningMessage from './warning-message';
import { screen } from '@testing-library/react';

describe('Component: WarningMessage', () => {
  test('should be render correctly', () => {
    renderWithContext(<WarningMessage />);

    expect(screen.getByTestId('field-warning')).toBeInTheDocument();
  });
});
