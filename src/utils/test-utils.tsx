import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import { getStoreWithState, RootState } from '../store/store';

export const renderWithContext = (children: React.ReactNode, state?: RootState, history?: MemoryHistory) => {
  const store = getStoreWithState(state);

  if (!history) {
    history = createMemoryHistory();
  }

  const fakeApp = render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    </Provider>,
  );

  return { store, history, ...fakeApp };
};
