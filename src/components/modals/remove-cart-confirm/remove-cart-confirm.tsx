import React from 'react';

import ModalLayout from '../modal-layout/modal-layout';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import { removeProductFromCart } from '../../../store/cart/cart.slice';

import type { CartGuitar } from '../../../types/guitar';

type RemoveCartConfirmProps = CartGuitar & {
  onCloseConfirmRemoveModal: () => void;
  isRemoveConfirmOpen: boolean;
};

function RemoveCartConfirm({
  name,
  price,
  previewImg,
  vendorCode,
  type,
  stringCount,
  id,
  onCloseConfirmRemoveModal,
  isRemoveConfirmOpen,
}: RemoveCartConfirmProps) {
  const dispatch = useTypedDispatch();

  const handleRemoveProduct = () => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <ModalLayout onClose={onCloseConfirmRemoveModal} isShow={isRemoveConfirmOpen}>
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
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
            <span className="modal__price">{price.toLocaleString()} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="button button--small modal__button" onClick={handleRemoveProduct}>
          Удалить товар
        </button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={onCloseConfirmRemoveModal}
        >
          Продолжить покупки
        </button>
      </div>
      <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </ModalLayout>
  );
}

export default RemoveCartConfirm;
