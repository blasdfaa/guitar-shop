import { Link, useLocation } from 'react-router-dom';

import SearchField from '../search-field/search-field';
import { AppRoute } from '../../constants';

const navigationItems = [
  { id: 1, name: 'Каталог', route: '/' },
  { id: 2, name: 'Где купить?', route: '#' },
  { id: 3, name: 'О компании', route: '#' },
];

function AppHeader() {
  const location = useLocation();

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Home} data-testid="header-logo">
          <img
            alt="Логотип"
            className="logo__img"
            height="70"
            src="./img/svg/logo.svg"
            width="70"
          />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list" data-testid="navigation-list">
            {navigationItems.map((item) => {
              const isRouteMatched = location.pathname === item.route;

              return (
                <li key={item.id}>
                  <Link
                    className={`link main-nav__link ${
                      isRouteMatched ? 'link--current' : ''
                    }`}
                    to={item.route}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SearchField />
        <Link aria-label="Корзина" className="header__cart-link" to={AppRoute.Cart}>
          <svg
            aria-hidden="true"
            className="header__cart-icon"
            height="14"
            width="14"
            data-testid="cart-icon"
          >
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
