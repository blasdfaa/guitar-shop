import React from 'react';

import { formatGuitarType } from '../../../../../utils/product';
import RemoveCartConfirm from '../../../../modals/remove-cart-confirm/remove-cart-confirm';
import useTypedDispatch from '../../../../../hooks/use-typed-dispatch';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import {
  quantityProductByIdSelector,
  totalPriceProductByIdSelector,
} from '../../../../../store/cart/cart.selector';
import {
  addQuantityItem,
  decreaseProductQuantity,
  increaseProductQuantity,
} from '../../../../../store/cart/cart.slice';

import type { CartGuitar } from '../../../../../types/guitar';

const MIN_PRODUCTS_QUANTITY = 1;
const MAX_PRODUCTS_QUANTITY = 99;

function CartItem({ id, type, stringCount, vendorCode, name, price, previewImg }: CartGuitar) {
  const dispatch = useTypedDispatch();

  const [isRemoveConfirmModalOpen, setRemoveConfirmModalOpen] = React.useState<boolean>(false);
  const [quantityValue, setQuantityValue] = React.useState<number>(1);

  const totalProductPrice = useTypedSelector((state) =>
    totalPriceProductByIdSelector(state, id),
  ).toLocaleString();
  const productQuantity = useTypedSelector((state) => quantityProductByIdSelector(state, id));

  React.useEffect(() => {
    setQuantityValue(productQuantity);
  }, [productQuantity]);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value > 0 && value <= MAX_PRODUCTS_QUANTITY) {
      setQuantityValue(value);
      dispatch(addQuantityItem({ productId: id, value }));
    }
  };

  const handleOpenConfirmModal = () => {
    setRemoveConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setRemoveConfirmModalOpen(false);
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseProductQuantity(id));
  };

  const handleDecreaseQuantity = () => {
    if (isOnlyProductLeft) {
      handleOpenConfirmModal();
    }

    dispatch(decreaseProductQuantity(id));
  };

  const cartProduct: CartGuitar = {
    name,
    previewImg,
    price,
    id,
    type,
    stringCount,
    vendorCode,
  };

  const isOnlyProductLeft = quantityValue === MIN_PRODUCTS_QUANTITY;

  return (
    <div className="cart-item" data-testid="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleOpenConfirmModal}
      >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img src={previewImg} srcSet={`${previewImg} 2x`} width="55" height="130" alt={name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">
          {formatGuitarType(type)}, {stringCount} струнная
        </p>
      </div>
      <div className="cart-item__price">{price.toLocaleString()} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleDecreaseQuantity}
        >
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
          value={quantityValue}
          onChange={handleChangeQuantity}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleIncreaseQuantity}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use href="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{totalProductPrice} ₽</div>
      <RemoveCartConfirm
        {...cartProduct}
        onCloseConfirmRemove={handleCloseConfirmModal}
        isRemoveConfirmOpen={isRemoveConfirmModalOpen}
      />
    </div>
  );
}

export default CartItem;
