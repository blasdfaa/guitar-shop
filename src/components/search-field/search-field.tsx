import React from 'react';

import useTypedDispatch from '../../hooks/use-typed-dispatch';
import { fetchGuitarsByName } from '../../store/search/search.async';
import useTypedSelector from '../../hooks/use-typed-selector';
import { searchedGuitarsByNameSelector } from '../../store/search/search.selector';

function SearchField() {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const dispatch = useTypedDispatch();
  // TODO: Добавить прелоадер для состояния загрузки айтемов
  const searchingGuitars = useTypedSelector((state) => searchedGuitarsByNameSelector(state, searchValue));

  React.useEffect(() => {
    if (searchValue) {
      dispatch(fetchGuitarsByName(searchValue));
    }
  }, [searchValue, dispatch]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
          data-testid="search-input"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      <ul
        className="form-search__select-list"
        hidden={!searchValue}
        style={{ zIndex: 2 }}
        data-testid="search-dropdown"
      >
        {isGuitarsFound &&
          searchingGuitars.map((guitar) => (
            <li className="form-search__select-item" tabIndex={0} key={guitar.id}>
              {guitar.name}
            </li>
          ))}
        {isGuitarsNotFound && <li className="form-search__select-item">Ничего не найдено</li>}
      </ul>
    </div>
  );
}

export default SearchField;
