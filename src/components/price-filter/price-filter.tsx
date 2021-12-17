import React from 'react';
import useTypedDispatch from '../../hooks/use-typed-dispatch';

import useTypedSelector from '../../hooks/use-typed-selector';
import {
  getMaxGuitarPrice,
  getMinGuitarPrice,
  getSelectedPriceMaxFilter,
  getSelectedPriceMinFilter,
} from '../../store/catalog/catalog.selector';
import { setPriceMaxFilter, setPriceMinFilter } from '../../store/catalog/catalog.slice';

function PriceFilter() {
  const dispatch = useTypedDispatch();

  const maxPriceRange = useTypedSelector(getMaxGuitarPrice);
  const minPriceRange = useTypedSelector(getMinGuitarPrice);
  const selectedPriceMin = useTypedSelector(getSelectedPriceMinFilter);
  const selectedPriceMax = useTypedSelector(getSelectedPriceMaxFilter);

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPriceMinFilter(e.target.value));
  };

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPriceMaxFilter(e.target.value));
  };

  const handleBlurMinPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    if (minPriceRange && value && value < minPriceRange) {
      dispatch(setPriceMinFilter(minPriceRange.toString()));
    }
  };

  const handleBlurMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    if (maxPriceRange && value && value > maxPriceRange) {
      dispatch(setPriceMaxFilter(maxPriceRange.toString()));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            id="priceMin"
            name="от"
            placeholder={minPriceRange?.toString()}
            type="number"
            value={selectedPriceMin}
            onChange={handleChangeMinPrice}
            onBlur={handleBlurMinPrice}
            disabled={!minPriceRange}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            id="priceMax"
            name="до"
            placeholder={maxPriceRange?.toString()}
            type="number"
            value={selectedPriceMax}
            onChange={handleChangeMaxPrice}
            onBlur={handleBlurMaxPrice}
            disabled={!maxPriceRange}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
