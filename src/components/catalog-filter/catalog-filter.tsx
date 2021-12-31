import React from 'react';
import { useSearchParams } from 'react-router-dom';

import CatalogPriceFilter from '../catalog-price-filter/catalog-price-filter';
import { ApiSearchParamKey } from '../../constants';

export enum FilterGuitarTypes {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

const stringsCountItems = [
  { id: 1, value: 4 },
  { id: 2, value: 6 },
  { id: 3, value: 7 },
  { id: 4, value: 12 },
];

const guitarTypesItems = {
  items: [
    {
      id: 1,
      value: FilterGuitarTypes.Acoustic,
      label: 'Акустические гитары',
      matchingStrings: [6, 7, 12],
    },
    {
      id: 2,
      value: FilterGuitarTypes.Electric,
      label: 'Электрогитары',
      matchingStrings: [4, 6, 7],
    },
    {
      id: 3,
      value: FilterGuitarTypes.Ukulele,
      label: 'Укулеле',
      matchingStrings: [4],
    },
  ],
  selected: [] as FilterGuitarTypes[],
  availableStrings: [] as number[],
};

function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const prevSelectedTypes = searchParams.getAll(ApiSearchParamKey.Type);
  const prevSelectedStringsCount = searchParams.getAll(ApiSearchParamKey.StringsCount);

  const [typeValues, setTypeValues] = React.useState(guitarTypesItems);
  const [stringsCount, setStringsCount] = React.useState<number[]>([]);

  React.useEffect(() => {
    const strings = prevSelectedTypes
      .map((currentType) => guitarTypesItems.items.filter(({ value }) => value === currentType))
      .flat()
      .map(({ matchingStrings }) => matchingStrings)
      .flat();

    setStringsCount(prevSelectedStringsCount.map((string) => +string));

    setTypeValues((prevState) => ({
      ...prevState,
      selected: [...(prevSelectedTypes as FilterGuitarTypes[])],
      availableStrings: [...strings],
    }));
  }, []);

  const updateFiltersSearchParams = (paramKey: ApiSearchParamKey, newValue: string): void => {
    const isParamExist = searchParams.getAll(paramKey).includes(newValue);

    if (!isParamExist) {
      searchParams.append(paramKey, newValue);
      setSearchParams(searchParams);
    } else {
      const newParams = new URLSearchParams([...searchParams].filter(([_key, value]) => value !== newValue));
      setSearchParams(newParams);
    }
  };

  const handleChangeGuitarType = (selectedType: FilterGuitarTypes, availableStrings: number[]) => {
    setTypeValues((prevTypes) => {
      if (prevTypes.selected.includes(selectedType)) {
        return {
          ...prevTypes,
          selected: [...prevTypes.selected.filter((type) => type !== selectedType)],
          availableStrings: [
            ...prevTypes.availableStrings.filter((strings) => !availableStrings.includes(strings)),
          ],
        };
      }

      return {
        ...prevTypes,
        selected: [...prevTypes.selected, selectedType],
        availableStrings: [...prevTypes.availableStrings, ...availableStrings],
      };
    });

    updateFiltersSearchParams(ApiSearchParamKey.Type, selectedType);
  };

  const handleChangeStringCount = (selectedString: number): void => {
    setStringsCount((strings) => {
      if (strings.includes(selectedString)) {
        return strings.filter((currentType) => currentType !== selectedString);
      }

      return [...strings, selectedString];
    });

    updateFiltersSearchParams(ApiSearchParamKey.StringsCount, selectedString.toString());
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <CatalogPriceFilter />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {guitarTypesItems.items.map(({ id, label, value, matchingStrings }) => (
          <div className="form-checkbox catalog-filter__block-item" key={id}>
            <input
              className="visually-hidden"
              id={value}
              name={value}
              type="checkbox"
              checked={typeValues.selected.includes(value)}
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
              disabled={!!typeValues.availableStrings.length && !typeValues.availableStrings.includes(value)}
              className="visually-hidden"
              id={`${value}-strings`}
              name={`${value}-strings`}
              type="checkbox"
              checked={stringsCount.includes(value)}
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
