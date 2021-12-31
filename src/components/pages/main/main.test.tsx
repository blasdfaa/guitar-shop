import { screen } from '@testing-library/react';

import { renderWithContext } from '../../../utils/test-utils';
import Main from './main';

describe('Component: Main', () => {
  test('should render correctly', () => {
    renderWithContext(<Main />);

    expect(screen.getByRole('heading', { level: 1, name: 'Каталог гитар' })).toBeInTheDocument();
  });
});
