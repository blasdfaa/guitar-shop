import React from 'react';

function AppHeader() {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img alt="Логотип" className="logo__img" height="70" src="./img/svg/logo.svg" width="70" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link link--current" href="#">
                Каталог
              </a>
            </li>
            <li>
              <a className="link main-nav__link" href="#">
                Где купить?
              </a>
            </li>
            <li>
              <a className="link main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
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
            />
            <label className="visually-hidden" htmlFor="search">
              Поиск
            </label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={0}>
              Четстер Plus
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Четстер UX
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Четстер UX2
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Четстер UX3
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Четстер UX4
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Четстер UX5
            </li>
          </ul>
        </div>
        <a aria-label="Корзина" className="header__cart-link" href="#">
          <svg aria-hidden="true" className="header__cart-icon" height="14" width="14">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
