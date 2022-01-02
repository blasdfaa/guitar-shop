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
const PAGES_GROUP_STEP = 3;

function Pagination({ totalGuitars = 0 }: PaginationProps) {
  const { searchParams, updateSearchParams, deleteSearchParam } = useUpdateSearchParams();

  const prevSelectedPage = searchParams.get(ApiSearchParamKey.Page);

  const [pages, setPages] = React.useState<number>(DEFAULT_SELECTED_PAGE);
  const [currentPage, setCurrentPage] = React.useState<number>(
    Number(prevSelectedPage) || DEFAULT_SELECTED_PAGE,
  );
  const [pageGroup, setPageGroup] = React.useState<number>(DEFAULT_SELECTED_PAGE_GROUP);

  React.useEffect(() => {
    if (totalGuitars) {
      setPages(Math.ceil(totalGuitars / GUITARS_LIMIT));
    }
  }, [totalGuitars]);

  React.useEffect(() => {
    if (totalGuitars && pages < currentPage) {
      setCurrentPage(pages);
      deleteSearchParam(ApiSearchParamKey.Page);
    }
  }, [pages, searchParams]);

  const handleClickPage = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    const { textContent } = event.currentTarget;

    if (textContent) {
      const selectedPage = +textContent;

      setCurrentPage(selectedPage);
      updateSearchParams(ApiSearchParamKey.Page, selectedPage);
    }
  };

  const handleClickNextBtn = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    setPageGroup((group) => group + 1);
  };

  const handleClickPrevBtn = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    setPageGroup((group) => group - 1);
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

  const isShowPrevPageBtn = pageGroup > DEFAULT_SELECTED_PAGE_GROUP;
  const isShowNextPageBtn = pageGroup + PAGES_GROUP_STEP - 1 < pages;

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
