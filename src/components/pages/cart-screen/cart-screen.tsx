import React from 'react';

import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CartItem from './components/cart-item/cart-item';
import CouponForm from './components/coupon-form/coupon-form';
import useTypedSelector from '../../../hooks/use-typed-selector';
import {
  selectCoupon,
  selectDiscountValue,
  selectOrderedGuitarsIds,
  selectTotalCartPrice,
  selectTotalCartPriceWithDiscount,
  serializedCartProductsSelector,
} from '../../../store/cart/cart.selector';
import CartEmpty from './components/cart-empty/cart-empty';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import { postCartOrder } from '../../../store/cart/cart.async';

function CartScreen() {
  const dispatch = useTypedDispatch();

  const cartProducts = useTypedSelector(serializedCartProductsSelector);
  const totalCartPrice = useTypedSelector(selectTotalCartPrice).toLocaleString();
  const totalCartPriceWithDiscount = useTypedSelector(
    selectTotalCartPriceWithDiscount,
  ).toLocaleString();
  const discount = useTypedSelector(selectDiscountValue);
  const orderedIds = useTypedSelector(selectOrderedGuitarsIds);
  const coupon = useTypedSelector(selectCoupon);

  const handleSubmitOrder = () => {
    const order = {
      guitarsIds: orderedIds,
      coupon,
    };

    dispatch(postCartOrder(order));
  };

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
                      <span className="cart__total-value" data-testid="total-cart-price">
                        {totalCartPrice} ₽
                      </span>
                    </p>
                    <p className="cart__total-item">
                      <span className="cart__total-value-name">Скидка:</span>
                      <span className="cart__total-value cart__total-value--bonus">
                        - {discount} ₽
                      </span>
                    </p>
                    <p className="cart__total-item">
                      <span className="cart__total-value-name">К оплате:</span>
                      <span
                        className="cart__total-value cart__total-value--payment"
                        data-testid="total-cart-price-with-discount"
                      >
                        {totalCartPriceWithDiscount} ₽
                      </span>
                    </p>
                    <button
                      className="button button--red button--big cart__order-button"
                      type="button"
                      onClick={handleSubmitOrder}
                    >
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
