import { screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test-utils';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  test('should be render correctly', () => {
    renderWithContext(<Breadcrumbs />);

    expect(screen.getByTestId('breadcrumbs-list')).toBeInTheDocument();
  });
});
