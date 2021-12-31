import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithContext } from '../../utils/test-utils';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  test('should render correctly', () => {
    const { history } = renderWithContext(<Pagination totalGuitars={0} />);

    expect(screen.getAllByTestId('pagination-btn').length).toBe(1);
    expect(screen.queryByTestId('prev-pagination-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next-pagination-btn')).not.toBeInTheDocument();

    expect(history.location.search).toEqual('');
  });
  test('should set correctly page and url param by click button numeric', () => {
    const { history } = renderWithContext(<Pagination totalGuitars={30} />);

    const secondPageBtnParent = screen.getAllByRole('listitem')[1];
    const secondPageBtn = screen.getAllByTestId('pagination-btn')[1];

    userEvent.click(secondPageBtn);

    expect(history.location.search).toEqual(`?page=${secondPageBtn.textContent}`);
    expect(secondPageBtnParent.getAttribute('class')).toMatch(/active/i);
  });
  test('should render next button if there are more than 3 pages', () => {
    renderWithContext(<Pagination totalGuitars={30} />);

    expect(screen.getAllByTestId('pagination-btn').length).toBe(3);
    expect(screen.queryByTestId('prev-pagination-btn')).not.toBeInTheDocument();
    expect(screen.getByTestId('next-pagination-btn')).toBeInTheDocument();
  });
  test('should render previous button if page group is not 1', () => {
    renderWithContext(<Pagination totalGuitars={30} />);

    const nextPageBtn = screen.getByTestId('next-pagination-btn');
    userEvent.click(nextPageBtn);

    expect(screen.getAllByTestId('pagination-btn').length).toBe(1);
    expect(screen.getByTestId('prev-pagination-btn')).toBeInTheDocument();
  });
  test('should correctly change page group', () => {
    renderWithContext(<Pagination totalGuitars={100} />);

    const expectedPrevPageGroup = [1, 2, 3];
    const expectedNextPageGroup = [4, 5, 6];

    const nextPageBtn = screen.getByTestId('next-pagination-btn');

    let pageLinks = screen.getAllByTestId('pagination-btn').map((link) => Number(link.textContent));
    expect(pageLinks).toEqual(expectedPrevPageGroup);

    userEvent.click(nextPageBtn);

    pageLinks = screen.getAllByTestId('pagination-btn').map((link) => Number(link.textContent));
    expect(pageLinks).toEqual(expectedNextPageGroup);

    const prevPageBtn = screen.getByTestId('prev-pagination-btn');
    userEvent.click(prevPageBtn);

    pageLinks = screen.getAllByTestId('pagination-btn').map((link) => Number(link.textContent));
    expect(pageLinks).toEqual(expectedPrevPageGroup);
  });
});
