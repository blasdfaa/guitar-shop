import React from 'react';

import useUpdateSearchParams from '../../hooks/use-update-search-params';

enum SortOption {
  ByPrice = 'price',
  ByRating = 'rating',
}

enum OrderOption {
  Up = 'asc',
  Down = 'desc',
}

enum APISortKey {
  Sorting = '_sort',
  Order = '_order',
}

const sortingButtons = [
  { id: 1, value: SortOption.ByPrice, label: 'по цене' },
  { id: 2, value: SortOption.ByRating, label: 'по популярности' },
];

const orderButtons = [
  { id: 1, type: 'up', label: 'По возрастанию', value: OrderOption.Up },
  { id: 2, type: 'down', label: 'По убыванию', value: OrderOption.Down },
];

function CatalogSort() {
  const [sortType, setSortType] = React.useState<SortOption | null>(null);
  const [orderType, setOrderType] = React.useState<OrderOption | null>(null);

  const { updateSearchParams } = useUpdateSearchParams();

  const updateSortParam = (value: SortOption): void => {
    setSortType(value);
    updateSearchParams(APISortKey.Sorting, value);
  };

  const updateOrderParam = (value: OrderOption): void => {
    setOrderType(value);
    updateSearchParams(APISortKey.Order, value);
  };

  const handleChangeSortType = (sort: SortOption): void => {
    // Покупатель меняет тип сортировки по популярности, а стрелка остаётся: товар
    // выстраивается по популярности от меньшего к большему
    if (sort === SortOption.ByRating) {
      updateOrderParam(OrderOption.Down);
    }

    updateSortParam(sort);
  };

  const handleChangeOrderType = (order: OrderOption): void => {
    // Если тип сортировки не выбран и нажата одна из стрелок применяется первый тип сортировки
    // (цена)
    if (!sortType) {
      updateSortParam(SortOption.ByPrice);
    }

    updateOrderParam(order);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {sortingButtons.map(({ id, value, label }) => (
          <button
            aria-label={label}
            className={`catalog-sort__type-button ${
              sortType === value ? 'catalog-sort__type-button--active' : ''
            }`}
            tabIndex={sortType === value ? -1 : undefined}
            onClick={() => handleChangeSortType(value)}
            key={id}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="catalog-sort__order">
        {orderButtons.map(({ id, type, label, value }) => (
          <button
            aria-label={label}
            className={`catalog-sort__order-button catalog-sort__order-button--${type} ${
              orderType === type ? 'catalog-sort__order-button--active' : ''
            }`}
            onClick={() => handleChangeOrderType(value)}
            tabIndex={orderType === type ? -1 : undefined}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogSort;
