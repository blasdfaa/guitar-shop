import React from 'react';

import useTypedDispatch from '../../hooks/use-typed-dispatch';
import { fetchGuitarsByName } from '../../store/search/search.async';
import useTypedSelector from '../../hooks/use-typed-selector';
import { searchedGuitarsByNameSelector, selectSearchLoadingStatus } from '../../store/search/search.selector';
import { FetchDataStatus } from '../../constants';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';

function SearchField() {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const dispatch = useTypedDispatch();

  const searchingGuitars = useTypedSelector((state) => searchedGuitarsByNameSelector(state, searchValue));
  const searchLoadingStatus = useTypedSelector(selectSearchLoadingStatus);

  React.useEffect(() => {
    if (searchValue) {
      dispatch(fetchGuitarsByName(searchValue));
    }
  }, [searchValue, dispatch]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const isGuitarsFound = searchingGuitars?.length > 0 && searchLoadingStatus === FetchDataStatus.Success;
  const isGuitarsNotFound =
    searchingGuitars?.length === 0 &&
    (searchLoadingStatus === FetchDataStatus.Success || searchLoadingStatus === FetchDataStatus.Failed);
  const isSearchResultsLoading =
    searchLoadingStatus === FetchDataStatus.Idle && searchingGuitars?.length === 0;

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
          searchingGuitars.map(({ name, id }) => (
            <li className="form-search__select-item" tabIndex={0} key={id}>
              <Link to={`/${id}`}>{name}</Link>
            </li>
          ))}
        {isGuitarsNotFound && <li className="form-search__select-item">Ничего не найдено</li>}
        {isSearchResultsLoading && (
          <li className="form-search__select-item">
            <Loader className="form-search__loader" />
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchField;
