import React from 'react';

import useUpdateSearchParams from '../../../../../hooks/use-update-search-params';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import { calculatedGuitarPriceSelector } from '../../../../../store/guitar/guitar.selector';
import { ApiSearchParamKey } from '../../../../../constants';

function CatalogPriceFilter() {
  const { searchParams, updateSearchParams, deleteSearchParam } = useUpdateSearchParams();

  const prevSelectedMinPrice = searchParams.get(ApiSearchParamKey.MinPrice);
  const prevSelectedMaxPrice = searchParams.get(ApiSearchParamKey.MaxPrice);

  const [minPriceValue, setMinPriceValue] = React.useState<number | ''>(Number(prevSelectedMinPrice) || '');
  const [maxPriceValue, setMaxPriceValue] = React.useState<number | ''>(Number(prevSelectedMaxPrice) || '');

  const { calculatedMinPrice, calculatedMaxPrice } = useTypedSelector(calculatedGuitarPriceSelector);

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    if (!value) {
      setMinPriceValue('');
      deleteSearchParam(ApiSearchParamKey.MinPrice);
      return;
    }

    setMinPriceValue(value);
    updateSearchParams(ApiSearchParamKey.MinPrice, value.toString());
  };

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    if (!value) {
      setMaxPriceValue('');
      deleteSearchParam(ApiSearchParamKey.MaxPrice);
      return;
    }

    setMaxPriceValue(value);
    updateSearchParams(ApiSearchParamKey.MaxPrice, value.toString());
  };

  const handleBlurMinPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e?.target?.value;

    if (value && calculatedMaxPrice && value < calculatedMinPrice) {
      setMinPriceValue(calculatedMinPrice);
      updateSearchParams(ApiSearchParamKey.MinPrice, calculatedMinPrice.toString());
      return;
    }

    setMinPriceValue('');
    deleteSearchParam(ApiSearchParamKey.MinPrice);
  };

  const handleBlurMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e?.target?.value;

    if (value && calculatedMaxPrice && value > calculatedMaxPrice) {
      setMaxPriceValue(calculatedMaxPrice);
      updateSearchParams(ApiSearchParamKey.MaxPrice, calculatedMaxPrice.toString());
      return;
    }

    setMaxPriceValue('');
    deleteSearchParam(ApiSearchParamKey.MaxPrice);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden" htmlFor="priceMin">
            Минимальная цена
          </label>
          <input
            id="priceMin"
            name="от"
            placeholder={calculatedMinPrice.toString()}
            type="number"
            value={minPriceValue}
            onChange={handleChangeMinPrice}
            onBlur={handleBlurMinPrice}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden" htmlFor="priceMax">
            Максимальная цена
          </label>
          <input
            id="priceMax"
            name="до"
            placeholder={calculatedMaxPrice.toString()}
            type="number"
            value={maxPriceValue}
            onChange={handleChangeMaxPrice}
            onBlur={handleBlurMaxPrice}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default CatalogPriceFilter;
