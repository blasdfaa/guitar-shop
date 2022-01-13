import { screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test-utils';
import Loader from './loader';

describe('Component: Loader', () => {
  test('should render correctly', () => {
    renderWithContext(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
