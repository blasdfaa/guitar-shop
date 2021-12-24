import React from 'react';
import { useLocation } from 'react-router-dom';

import { useGetAllGuitarsQuery } from '../../store/guitar/guitar.api';
import useUpdateSearchParams from '../../hooks/use-update-search-params';

enum APIPriceKey {
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
}

function PriceFilter() {
  const { search } = useLocation();

  const { searchParams, updateSearchParams, deleteSearchParam } = useUpdateSearchParams();

  const prevSelectedMinPrice = searchParams.get(APIPriceKey.MinPrice);
  const prevSelectedMaxPrice = searchParams.get(APIPriceKey.MaxPrice);

  const [minPriceValue, setMinPriceValue] = React.useState<number | ''>(Number(prevSelectedMinPrice) || '');
  const [maxPriceValue, setMaxPriceValue] = React.useState<number | ''>(Number(prevSelectedMaxPrice) || '');

  const { calculatedMinGuitarPrice, calculatedMaxGuitarPrice } = useGetAllGuitarsQuery(search, {
    selectFromResult: ({ data: guitarsData }) => {
      // Получает минимальную и максимальную цену гитар на основе выбранных фильтров
      const guitars = guitarsData?.guitars;

      return {
        calculatedMinGuitarPrice: guitars?.length ? Math.min(...guitars.map((guitar) => guitar.price)) : 0,
        calculatedMaxGuitarPrice: guitars?.length ? Math.max(...guitars.map((guitar) => guitar.price)) : 0,
      };
    },
  });

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    if (!value) {
      setMinPriceValue('');
      deleteSearchParam(APIPriceKey.MinPrice);
      return;
    }

    setMinPriceValue(value);
    updateSearchParams(APIPriceKey.MinPrice, value.toString());
  };

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;

    if (!value) {
      setMaxPriceValue('');
      deleteSearchParam(APIPriceKey.MaxPrice);
      return;
    }

    setMaxPriceValue(value);
    updateSearchParams(APIPriceKey.MaxPrice, value.toString());
  };

  const handleBlurMinPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e?.target?.value;

    if (value && value < calculatedMinGuitarPrice) {
      setMinPriceValue(calculatedMinGuitarPrice);
    }
  };

  const handleBlurMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e?.target?.value;

    if (value && value > calculatedMaxGuitarPrice) {
      setMaxPriceValue(calculatedMaxGuitarPrice);
      return;
    }

    if (value && value < calculatedMinGuitarPrice) {
      setMaxPriceValue(calculatedMinGuitarPrice);
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
            placeholder={calculatedMinGuitarPrice.toString()}
            type="number"
            value={minPriceValue}
            onChange={handleChangeMinPrice}
            onBlur={handleBlurMinPrice}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            id="priceMax"
            name="до"
            placeholder={calculatedMaxGuitarPrice.toString()}
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

export default PriceFilter;
