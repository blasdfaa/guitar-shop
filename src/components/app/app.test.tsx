import { createMemoryHistory } from 'history';

import App from './app';
import { renderWithContext } from '../../utils/test-utils';
import { AppRoute } from '../../constants';

describe('App routing', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.push(AppRoute.Home);
  });

  test('should set pathname main page when user navigate to "/"', () => {
    history.push(AppRoute.Home);
    renderWithContext(<App />, undefined, history);

    expect(history.location.pathname).toEqual(AppRoute.Home);
  });
  test('should set pathname cart page when user navigate to "/cart"', () => {
    history.push(AppRoute.Cart);
    renderWithContext(<App />, undefined, history);

    expect(history.location.pathname).toEqual(AppRoute.Cart);
  });
  test('should set pathname product page when user navigate to "/:productId"', () => {
    history.push('/1');
    renderWithContext(<App />, undefined, history);

    expect(history.location.pathname).toEqual('/1');
  });
});
