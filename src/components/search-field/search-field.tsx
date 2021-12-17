import React from 'react';

import useTypedSelector from '../../hooks/use-typed-selector';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
// import { allGuitarsSelector } from '../../store/guitar/guitar.selector';
import { selectGuitar } from '../../store/searched-guitar/searched-guitar.slice';

function SearchField() {
  const dispatch = useTypedDispatch();

  const [searchValue, setSearchValue] = React.useState<string>('');

  // TODO: Добавить прелоадер пока данные не загрузились
  // const guitars = useTypedSelector(allGuitarsSelector);

  // const searchingGuitars = guitars?.data?.filter((guitar) =>
  //   guitar.name.toLowerCase().includes(searchValue.toLowerCase()),
  // );

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleSelectGuitar = (name: string): void => {
    // push to route
  };

  const handleSearchGuitar = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const guitarName = searchValue.trim();

    if (guitarName.length) {
      dispatch(selectGuitar(searchValue));
    }
  };

  // const isGuitarsFound = searchingGuitars && searchingGuitars.length > 0;
  // const isGuitarsNotFound = searchingGuitars?.length === 0;

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit" onClick={handleSearchGuitar}>
          <svg aria-hidden="true" className="form-search__icon" height="15" width="14">
            <use xlinkHref="#icon-search" />
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          autoComplete="off"
          className="form-search__input"
          id="search"
          placeholder="что вы ищите?"
          type="text"
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      <ul className="form-search__select-list" hidden={!searchValue} style={{ zIndex: 2 }}>
        {/* {isGuitarsFound &&
          searchingGuitars.map((guitar) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              key={guitar.id}
              onClick={() => handleSelectGuitar(guitar.name)}
            >
              {guitar.name}
            </li>
          ))}
        {isGuitarsNotFound && (
          <li className="form-search__select-item" tabIndex={0}>
            Ничего не найдено
          </li>
        )} */}
      </ul>
    </div>
  );
}

export default SearchField;
