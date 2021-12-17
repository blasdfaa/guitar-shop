import React from 'react';

import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { getOrderType, getSortingType } from '../../store/catalog/catalog.selector';
import { setOrder, setSortType } from '../../store/catalog/catalog.slice';

const sortingButtons = [
  { id: 1, sortType: 'price', label: 'по цене' },
  { id: 2, sortType: 'rating', label: 'по популярности' },
];

const orderButtons = [
  { id: 1, orderType: 'up', label: 'По возрастанию', value: 'asc' },
  { id: 2, orderType: 'down', label: 'По убыванию', value: 'desc' },
];

function CatalogSort() {
  const dispatch = useTypedDispatch();

  const selectedSortType = useTypedSelector(getSortingType);
  const selectedOrderType = useTypedSelector(getOrderType);

  const handleChangeSortType = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.sortType) {
      dispatch(setSortType(e.currentTarget.dataset.sortType));
    }
  };

  const handleChangeOrderType = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.orderValue) {
      dispatch(setOrder(e.currentTarget.dataset.orderValue));
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {sortingButtons.map(({ id, sortType, label }) => (
          <button
            data-sort-type={sortType}
            aria-label={label}
            className={`catalog-sort__type-button ${
              selectedSortType === sortType ? 'catalog-sort__type-button--active' : ''
            }`}
            tabIndex={selectedSortType === sortType ? -1 : undefined}
            onClick={handleChangeSortType}
            key={id}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="catalog-sort__order">
        {orderButtons.map(({ id, orderType, label, value }) => (
          <button
            data-order-value={value}
            aria-label={label}
            className={`catalog-sort__order-button catalog-sort__order-button--${orderType} ${
              selectedOrderType === orderType ? 'catalog-sort__order-button--active' : ''
            }`}
            onClick={handleChangeOrderType}
            tabIndex={selectedOrderType === orderType ? -1 : undefined}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogSort;
