import { screen } from '@testing-library/react';
import App from './app';
import { renderWithContext } from '../../utils/test-utils';
import { createMemoryHistory } from 'history';

describe('App routing', () => {
  test('should render component "Main" when user navigate to "/"', () => {
    renderWithContext(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Каталог гитар' })).toBeInTheDocument();
  });
  test('should render component "NotFoundScreen" when user navigate to non-existent route', () => {
    const history = createMemoryHistory();
    history.push('/fake-route');

    renderWithContext(<App />, undefined, history);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Ищете что-то интересное на нашем сайте\?/i)).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
