import React from 'react';

import { formatGuitarType } from '../../../../../utils/product';
import useTypedDispatch from '../../../../../hooks/use-typed-dispatch';
import { removeProductFromCart } from '../../../../../store/cart/cart.slice';

import type { CartProduct } from '../../../../../types/guitar';

function CartItem({
  id,
  type,
  stringCount,
  vendorCode,
  name,
  price,
  previewImg,
}: CartProduct) {
  const dispatch = useTypedDispatch();
  const handleRemoveProduct = () => {
    dispatch(removeProductFromCart(id));
  };
  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleRemoveProduct}
      >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img
          src={previewImg}
          srcSet={`${previewImg} 2x`}
          width="55"
          height="130"
          alt={name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">
          {formatGuitarType(type)}, {stringCount} струнная
        </p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use href="#icon-minus" />
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          max="99"
        />
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use href="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">17 500 ₽</div>
    </div>
  );
}

export default CartItem;
