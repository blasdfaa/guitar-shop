import React from 'react';
import { useSearchParams } from 'react-router-dom';

import CatalogPriceFilter from '../catalog-price-filter/catalog-price-filter';
import { ApiSearchParamKey, FilterGuitarType } from '../../constants';

type SearchParam = [string, string][];

const stringsCountItems = [
  { id: 1, value: 4 },
  { id: 2, value: 6 },
  { id: 3, value: 7 },
  { id: 4, value: 12 },
];

const guitarTypesItems = [
  {
    id: 1,
    value: FilterGuitarType.Acoustic,
    label: 'Акустические гитары',
    matchingStrings: [6, 7, 12],
  },
  {
    id: 2,
    value: FilterGuitarType.Electric,
    label: 'Электрогитары',
    matchingStrings: [4, 6, 7],
  },
  {
    id: 3,
    value: FilterGuitarType.Ukulele,
    label: 'Укулеле',
    matchingStrings: [4],
  },
];

function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const guitarTypeParams = searchParams.getAll(ApiSearchParamKey.Type);
  const stringsCountParams = searchParams.getAll(ApiSearchParamKey.StringsCount);

  const [availableStrings, setAvailableStrings] = React.useState<number[][]>([]);

  const serializedAvailableStrings = availableStrings.flat();
  const notAvailableStrings = stringsCountParams.filter(
    (selectedString) =>
      serializedAvailableStrings.length !== 0 && !serializedAvailableStrings.includes(+selectedString),
  );

  React.useEffect(() => {
    [...guitarTypeParams].forEach((type) => {
      const stringsFromURL = guitarTypesItems.find((item) => item.value === type)?.matchingStrings;

      if (stringsFromURL) {
        updateAvailableStringsCount(stringsFromURL);
      }
    });
  }, []);

  React.useEffect(() => {
    if (notAvailableStrings.length !== 0) {
      toggleSearchParams(notAvailableStrings.map((param) => [ApiSearchParamKey.StringsCount, param]));
    }
  }, [notAvailableStrings]);

  const toggleSearchParams = (params: SearchParam): void => {
    const newSearchParams = [...searchParams];

    for (const prevParam of params) {
      const index = newSearchParams.findIndex(
        (newParam) => prevParam[0] === newParam[0] && prevParam[1] === newParam[1],
      );

      if (index === -1) {
        newSearchParams.push(prevParam);
      } else {
        newSearchParams.splice(index, 1);
      }
    }

    setSearchParams(new URLSearchParams(newSearchParams));
  };

  const updateAvailableStringsCount = (newStrings: number[]): void => {
    setAvailableStrings((prevState) => {
      if (prevState.includes(newStrings)) {
        return [...prevState.filter((currentStrings) => newStrings !== currentStrings)];
      }

      return [...prevState, newStrings];
    });
  };

  const handleChangeGuitarType = (selectedType: FilterGuitarType, matchingStrings: number[]): void => {
    updateAvailableStringsCount(matchingStrings);
    toggleSearchParams([[ApiSearchParamKey.Type, selectedType]]);
  };

  const handleChangeStringCount = (selectedString: number): void => {
    toggleSearchParams([[ApiSearchParamKey.StringsCount, selectedString.toString()]]);
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <CatalogPriceFilter />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {guitarTypesItems.map(({ id, label, value, matchingStrings }) => (
          <div className="form-checkbox catalog-filter__block-item" key={id}>
            <input
              className="visually-hidden"
              id={value}
              name={value}
              type="checkbox"
              checked={guitarTypeParams.includes(value)}
              onChange={() => handleChangeGuitarType(value, matchingStrings)}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {stringsCountItems.map(({ id, value }) => (
          <div className="form-checkbox catalog-filter__block-item" key={id}>
            <input
              disabled={serializedAvailableStrings.length > 0 && !serializedAvailableStrings.includes(value)}
              className="visually-hidden"
              id={`${value}-strings`}
              name={`${value}-strings`}
              type="checkbox"
              checked={stringsCountParams.includes(value.toString())}
              onChange={() => handleChangeStringCount(value)}
            />
            <label htmlFor={`${value}-strings`}>{value}</label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
