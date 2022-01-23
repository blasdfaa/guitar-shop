import React from 'react';

import ModalLayout from '../modal-layout/modal-layout';
import { addProductToCart } from '../../../store/cart/cart.slice';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';

import type { CartProduct } from '../../../types/cart';

type AddCartConfirmProps = CartProduct & {
  onCloseConfirmModal: () => void;
  onOpenSuccessModal: () => void;
};

function AddCartConfirm({
  name,
  price,
  previewImg,
  vendorCode,
  type,
  stringCount,
  id,
  onCloseConfirmModal,
  onOpenSuccessModal,
}: AddCartConfirmProps) {
  const dispatch = useTypedDispatch();

  const handleAddToCart = () => {
    const product: CartProduct = {
      id,
      type,
      stringCount,
      vendorCode,
      name,
      price,
      previewImg,
    };

    dispatch(addProductToCart(product));

    onCloseConfirmModal();
    onOpenSuccessModal();
  };
  return (
    <ModalLayout onClose={onCloseConfirmModal}>
      <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src={previewImg}
          srcSet={`${previewImg} 2x`}
          width="67"
          height="137"
          alt={name}
        />
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">
            Артикул: {vendorCode}
          </p>
          <p className="modal__product-params">Электрогитара, {stringCount} струнная</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{price.toLocaleString()} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button
          className="button button--red button--big modal__button modal__button--add"
          onClick={handleAddToCart}
        >
          Добавить в корзину
        </button>
      </div>
      <button
        className="modal__close-btn button-cross"
        type="button"
        aria-label="Закрыть"
        onClick={onCloseConfirmModal}
      >
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </ModalLayout>
  );
}

export default AddCartConfirm;
