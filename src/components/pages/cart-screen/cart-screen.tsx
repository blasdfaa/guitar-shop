import React from 'react';

import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CartItem from './components/cart-item/cart-item';
import CouponForm from './components/coupon-form/coupon-form';
import useTypedSelector from '../../../hooks/use-typed-selector';
import {
  selectDiscountValue,
  selectTotalCartPrice,
  selectTotalCartPriceWithDiscount,
  serializedCartProductsSelector,
} from '../../../store/cart/cart.selector';
import CartEmpty from './components/cart-empty/cart-empty';

function CartScreen() {
  const cartProducts = useTypedSelector(serializedCartProductsSelector);
  const totalCartPrice = useTypedSelector(selectTotalCartPrice).toLocaleString();
  const totalCartPriceWithDiscount = useTypedSelector(
    selectTotalCartPriceWithDiscount,
  ).toLocaleString();
  const discount = useTypedSelector(selectDiscountValue);

  const isCartEmpty = cartProducts.length === 0;

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          {!isCartEmpty && (
            <>
              <h1 className="title title--bigger page-content__title">Корзина</h1>
              <Breadcrumbs className="page-content__breadcrumbs--on-cart-page" />
              <div className="cart">
                {cartProducts.map((product) => (
                  <CartItem {...product} key={product.id} />
                ))}
                <div className="cart__footer">
                  <CouponForm />
                  <div className="cart__total-info">
                    <p className="cart__total-item">
                      <span className="cart__total-value-name">Всего:</span>
                      <span className="cart__total-value">{totalCartPrice} ₽</span>
                    </p>
                    <p className="cart__total-item">
                      <span className="cart__total-value-name">Скидка:</span>
                      <span className="cart__total-value cart__total-value--bonus">
                        - {discount} ₽
                      </span>
                    </p>
                    <p className="cart__total-item">
                      <span className="cart__total-value-name">К оплате:</span>
                      <span className="cart__total-value cart__total-value--payment">
                        {totalCartPriceWithDiscount} ₽
                      </span>
                    </p>
                    <button className="button button--red button--big cart__order-button">
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {isCartEmpty && <CartEmpty />}
        </div>
      </main>
    </MainLayout>
  );
}

export default CartScreen;
