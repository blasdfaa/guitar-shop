import React from 'react';
import { Link } from 'react-router-dom';

import AddCartConfirm from '../../../../modals/add-cart-confirm/add-cart-confirm';
import AddCartSuccess from '../../../../modals/add-cart-success/add-cart-success';
import { guitarIsCartByIdSelector } from '../../../../../store/cart/cart.selector';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import { AppRoute } from '../../../../../constants';

import type { CartGuitar } from '../../../../../types/guitar';

type GuitarPriceInfoProps = {
  guitar: CartGuitar | null;
};

function GuitarPriceInfo({ guitar }: GuitarPriceInfoProps) {
  const [isAddConfirmModalOpen, setAddConfirmModalOpen] = React.useState(false);
  const [isAddCartSuccessModalOpen, setAddCartSuccessModalOpen] =
    React.useState<boolean>(false);

  const isProductInCart = useTypedSelector((state) => {
    if (!guitar) return;

    return guitarIsCartByIdSelector(state, guitar.id);
  });

  const handleOpenAddConfirmModal = () => {
    setAddConfirmModalOpen(true);
  };

  const handleCloseAddConfirmModal = () => {
    setAddConfirmModalOpen(false);
  };

  const handleOpenAddCartSuccessModal = () => {
    setAddCartSuccessModalOpen(true);
  };

  const handleCloseAddCartSuccessModal = () => {
    setAddCartSuccessModalOpen(false);
  };

  return (
    <div className="product-container__price-wrapper">
      <p className="product-container__price-info product-container__price-info--title">
        Цена:
      </p>
      <p className="product-container__price-info product-container__price-info--value">
        {guitar?.price.toLocaleString()} ₽
      </p>
      {!isProductInCart && (
        <button
          className="button button--red button--big product-container__button"
          onClick={handleOpenAddConfirmModal}
        >
          Добавить в корзину
        </button>
      )}
      {isProductInCart && (
        <Link
          className="button button--red-border button--big product-container__button"
          to={AppRoute.Cart}
        >
          В корзине
        </Link>
      )}
      {guitar && (
        <AddCartConfirm
          {...guitar}
          onCloseConfirmModal={handleCloseAddConfirmModal}
          onOpenSuccessModal={handleOpenAddCartSuccessModal}
          isAddCartConfirmOpen={isAddConfirmModalOpen}
        />
      )}
      <AddCartSuccess
        onCloseSuccessModal={handleCloseAddCartSuccessModal}
        isAddCartSuccessOpen={isAddCartSuccessModalOpen}
      />
    </div>
  );
}

export default GuitarPriceInfo;
