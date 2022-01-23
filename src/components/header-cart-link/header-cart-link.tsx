import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../constants';
import useTypedSelector from '../../hooks/use-typed-selector';
import { totalCartProductsSelector } from '../../store/cart/cart.selector';

function HeaderCartLink() {
  const productsCount = useTypedSelector(totalCartProductsSelector);

  return (
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
      {!!productsCount && <span className="header__cart-count">{productsCount}</span>}
    </Link>
  );
}

export default HeaderCartLink;
