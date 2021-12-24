import React from 'react';

import useUpdateSearchParams from '../../hooks/use-update-search-params';

type PaginationProps = {
  totalGuitars: number | undefined;
};

enum APIGuitarsRangeKey {
  Start = '_start',
  End = '_end',
  Page = 'page',
}

const DEFAULT_SELECTED_PAGE = 1;
const DEFAULT_SELECTED_PAGE_GROUP = 1;
const GUITARS_LIMIT = 9;
const PAGES_LIMIT = 3;
const PAGES_GROUP_STEP = 3;

function Pagination({ totalGuitars }: PaginationProps) {
  const { searchParams, updateSearchParams, deleteSearchParam } = useUpdateSearchParams();

  const prevSelectedStartRange = searchParams.get(APIGuitarsRangeKey.Start);
  const prevSelectedEndRange = searchParams.get(APIGuitarsRangeKey.End);
  const prevSelectedPage = searchParams.get(APIGuitarsRangeKey.Page);

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
    if (pages < currentPage) {
      setCurrentPage(pages);
      deleteSearchParam(APIGuitarsRangeKey.Page);
      deleteSearchParam(APIGuitarsRangeKey.Start);
      deleteSearchParam(APIGuitarsRangeKey.End);
    }
  }, [pages, searchParams]);

  React.useEffect(() => {
    if (prevSelectedStartRange && prevSelectedEndRange) {
      updateSearchParams(APIGuitarsRangeKey.Start, prevSelectedStartRange);
      updateSearchParams(APIGuitarsRangeKey.End, prevSelectedEndRange);
    }
  }, []);

  const handleClickPage = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    const { textContent } = event.currentTarget;

    if (textContent) {
      const selectedPage = +textContent;

      const startIndex = selectedPage * GUITARS_LIMIT - GUITARS_LIMIT;
      const endIndex = startIndex + GUITARS_LIMIT;

      setCurrentPage(selectedPage);

      updateSearchParams(APIGuitarsRangeKey.Page, selectedPage);
      updateSearchParams(APIGuitarsRangeKey.Start, startIndex);
      updateSearchParams(APIGuitarsRangeKey.End, endIndex);
    }
  };

  const handleClickNextBtn = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    setPageGroup((page) => page + 3);
  };

  const handleClickPrevBtn = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    if (currentPage > PAGES_GROUP_STEP) {
      setPageGroup((page) => page - 3);
    }
  };

  const getPaginationGroup = React.useMemo(() => {
    const start = Math.floor((pageGroup - 1) / PAGES_LIMIT) * PAGES_LIMIT;

    return new Array(pages).fill(0).map((_, index) => start + index + 1);
  }, [pageGroup, pages]);

  const canShowPrevAndNextBtn = currentPage > PAGES_GROUP_STEP;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {canShowPrevAndNextBtn && (
          <li className="pagination__page pagination__page--prev" id="next">
            <a className="link pagination__page-link" href="2" onClick={handleClickPrevBtn}>
              Назад
            </a>
          </li>
        )}
        {getPaginationGroup.map((value) => (
          <li
            className={`pagination__page ${currentPage === value ? 'pagination__page--active' : ''}`}
            key={value}
          >
            <a className="link pagination__page-link" href="1" onClick={handleClickPage}>
              {value}
            </a>
          </li>
        ))}
        {canShowPrevAndNextBtn && (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link" href="2" onClick={handleClickNextBtn}>
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
