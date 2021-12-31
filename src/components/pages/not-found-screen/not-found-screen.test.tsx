import { screen } from '@testing-library/react';

import NotFoundScreen from './not-found-screen';
import { renderWithContext } from '../../../utils/test-utils';

describe('Component: NotFoundScreen', () => {
  test('should render correctly', () => {
    renderWithContext(<NotFoundScreen />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Ищете что-то интересное на нашем сайте?/i)).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
