import React from 'react';

function CatalogSort() {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          aria-label="по цене"
          className="catalog-sort__type-button catalog-sort__type-button--active"
          tabIndex={-1}
        >
          по цене
        </button>
        <button aria-label="по популярности" className="catalog-sort__type-button">
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          aria-label="По возрастанию"
          className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active"
          tabIndex={-1}
        />
        <button
          aria-label="По убыванию"
          className="catalog-sort__order-button catalog-sort__order-button--down"
        />
      </div>
    </div>
  );
}

export default CatalogSort;
