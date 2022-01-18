import { screen } from '@testing-library/react';

import App from './app';
import { renderWithContext } from '../../utils/test-utils';

describe('App routing', () => {
  test('should render component "Main" when user navigate to "/"', () => {
    renderWithContext(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Каталог гитар' })).toBeInTheDocument();
  });
});
