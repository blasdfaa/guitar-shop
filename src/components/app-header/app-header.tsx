import { Link } from 'react-router-dom';
import SearchField from '../search-field/search-field';

const navigationItems = [
  { id: 1, name: 'Каталог', route: '/' },
  { id: 2, name: 'Где купить?', route: '/' },
  { id: 3, name: 'О компании', route: '/' },
];

function AppHeader() {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img alt="Логотип" className="logo__img" height="70" src="./img/svg/logo.svg" width="70" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Link className="link main-nav__link link--current" to={item.route}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SearchField />
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
