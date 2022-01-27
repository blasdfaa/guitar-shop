import React from 'react';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div className="cart__empty" data-testid="empty-message">
      <h2 className="cart__empty-title">Корзина пустая 😕</h2>
      <p className="cart__empty-message">Вероятней всего, вы ничего не заказали.</p>
      <p className="cart__empty-message">
        Для того, чтобы сделать заказ, перейди на главную страницу.
      </p>
      <Link className="button button--mini cart__empty-link" to="/">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default CartEmpty;
