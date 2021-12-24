import React from 'react';

import { useGetMatchedGuitarBySearchQuery } from '../../store/guitar/guitar.api';

function SearchField() {
  const [isSkipRequest, setSkipRequest] = React.useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>('');

  // TODO: Добавить прелоадер пока данные не загрузились
  const guitars = useGetMatchedGuitarBySearchQuery(searchValue, { skip: isSkipRequest });

  const searchingGuitars = guitars?.data?.filter((guitar) =>
    guitar.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSkipRequest(false);
    setSearchValue(e.target.value);
  };

  const isGuitarsFound = searchingGuitars && searchingGuitars.length > 0;
  const isGuitarsNotFound = searchingGuitars?.length === 0;

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
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
        {isGuitarsFound &&
          searchingGuitars.map((guitar) => (
            <li className="form-search__select-item" tabIndex={0} key={guitar.id}>
              {guitar.name}
            </li>
          ))}
        {isGuitarsNotFound && (
          <li className="form-search__select-item" tabIndex={0}>
            Ничего не найдено
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchField;
