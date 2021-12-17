import React from 'react';

const checkboxItems = [
  { id: 1, value: 4 },
  { id: 2, value: 6 },
  { id: 3, value: 7 },
  { id: 4, value: 12 },
];

function StringCountFilter() {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {checkboxItems.map((checkbox) => (
        <div className="form-checkbox catalog-filter__block-item" key={checkbox.id}>
          <input
            className="visually-hidden"
            id={`${checkbox.value}-strings`}
            name={`${checkbox.value}-strings`}
            type="checkbox"
          />
          <label htmlFor={`${checkbox.value}-strings`}>{checkbox.value}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default StringCountFilter;
