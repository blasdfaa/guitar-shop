import React from 'react';

import ModalLayout from '../modal-layout/modal-layout';
import { addProductToCart } from '../../../store/cart/cart.slice';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';

import type { CartGuitar } from '../../../types/guitar';

type AddCartConfirmProps = CartGuitar & {
  onCloseConfirmModal: () => void;
  onOpenSuccessModal: () => void;
  onConfirmButtonCustomCallback?: () => void;
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
  onConfirmButtonCustomCallback,
}: AddCartConfirmProps) {
  const dispatch = useTypedDispatch();

  const handleAddToCart = () => {
    const product: CartGuitar = {
      id,
      type,
      stringCount,
      vendorCode,
      name,
      price,
      previewImg,
    };

    dispatch(addProductToCart(product));

    handleCloseModal();
  };

  const handleCustomCallbackOnClick = () => {
    if (onConfirmButtonCustomCallback) {
      onConfirmButtonCustomCallback();

      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
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
          <p className="modal__product-params">
            {type}, {stringCount} струнная
          </p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{price && price.toLocaleString()} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button
          className="button button--red button--big modal__button modal__button--add"
          onClick={onConfirmButtonCustomCallback ? handleCustomCallbackOnClick : handleAddToCart}
        >
          Добавить в корзину
        </button>
      </div>
    </ModalLayout>
  );
}

export default AddCartConfirm;
