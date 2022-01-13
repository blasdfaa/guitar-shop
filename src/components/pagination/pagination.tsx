import React from 'react';

import useUpdateSearchParams from '../../hooks/use-update-search-params';
import { ApiSearchParamKey } from '../../constants';

type PaginationProps = {
  totalGuitars?: number;
};

const DEFAULT_SELECTED_PAGE = 1;
const DEFAULT_SELECTED_PAGE_GROUP = 1;
const GUITARS_LIMIT = 9;
const PAGES_LIMIT = 3;

function Pagination({ totalGuitars = 0 }: PaginationProps) {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();

  const prevSelectedPage = searchParams.get(ApiSearchParamKey.Page);

  const [pages, setPages] = React.useState<number>(DEFAULT_SELECTED_PAGE);
  const [currentPage, setCurrentPage] = React.useState<number>(
    Number(prevSelectedPage) || DEFAULT_SELECTED_PAGE,
  );
  const [pageGroup, setPageGroup] = React.useState<number>(DEFAULT_SELECTED_PAGE_GROUP);

  React.useEffect(() => {
    updateSearchParams(ApiSearchParamKey.Page, currentPage);
  }, [currentPage]);

  React.useEffect(() => {
    if (totalGuitars) {
      setPages(Math.ceil(totalGuitars / GUITARS_LIMIT));
    }
  }, [totalGuitars]);

  React.useEffect(() => {
    if (totalGuitars && pages < currentPage) {
      setCurrentPage(pages);
    }
  }, [pages, searchParams]);

  const handleClickPage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const { textContent } = e.currentTarget;

    if (textContent) {
      const selectedPage = +textContent;

      setCurrentPage(selectedPage);
      updateSearchParams(ApiSearchParamKey.Page, selectedPage);
    }
  };

  const handleClickPrevBtn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    setCurrentPage((page) => page - 1);

    if (isFirstPageInGroup) {
      setPageGroup((group) => group - 1);
    }
  };

  const handleClickNextBtn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    setCurrentPage((page) => page + 1);

    if (isLastPageInGroup) {
      setPageGroup((group) => group + 1);
    }
  };

  const paginationGroup = React.useMemo(() => {
    const start = Math.floor((pageGroup - 1) / PAGES_LIMIT) * PAGES_LIMIT;

    const startIndex = pageGroup * PAGES_LIMIT - PAGES_LIMIT;
    const endIndex = startIndex + PAGES_LIMIT;

    return new Array(pages)
      .fill(0)
      .map((_, index) => start + index + 1)
      .slice(startIndex, endIndex);
  }, [pageGroup, pages]);

  const isShowPrevPageBtn = currentPage > DEFAULT_SELECTED_PAGE;
  const isShowNextPageBtn = currentPage < pages;
  const isLastPageInGroup = paginationGroup[PAGES_LIMIT - 1] === currentPage;
  const isFirstPageInGroup = paginationGroup[0] === currentPage;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isShowPrevPageBtn && (
          <li className="pagination__page pagination__page--prev" id="next">
            <a
              className="link pagination__page-link"
              href="2"
              onClick={handleClickPrevBtn}
              data-testid="prev-pagination-btn"
            >
              Назад
            </a>
          </li>
        )}
        {paginationGroup.map((value) => (
          <li
            className={`pagination__page ${currentPage === value ? 'pagination__page--active' : ''}`}
            key={value}
          >
            <a
              className="link pagination__page-link"
              href="1"
              onClick={handleClickPage}
              data-testid="pagination-btn"
            >
              {value}
            </a>
          </li>
        ))}
        {isShowNextPageBtn && (
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href="2"
              onClick={handleClickNextBtn}
              data-testid="next-pagination-btn"
            >
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
