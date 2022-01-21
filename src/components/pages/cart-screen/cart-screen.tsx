import React from 'react';

import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CartItem from './components/cart-item/cart-item';
import CouponForm from './components/coupon-form/coupon-form';

function CartScreen() {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs className="page-content__breadcrumbs--on-cart-page" />
          <div className="cart">
            <CartItem />
            <div className="cart__footer">
              <CouponForm />
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">52 000 ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className="cart__total-value cart__total-value--bonus">
                    - 3000 ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">
                    49 000 ₽
                  </span>
                </p>
                <button className="button button--red button--big cart__order-button">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default CartScreen;
