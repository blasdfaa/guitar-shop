import React from 'react';

import AddCartConfirm from '../../../../modals/add-cart-confirm/add-cart-confirm';
import AddCartSuccess from '../../../../modals/add-cart-success/add-cart-success';

import type { CartGuitar } from '../../../../../types/guitar';

type GuitarCartPriceProps = {
  guitar: CartGuitar | null;
};

function GuitarCartPrice({ guitar }: GuitarCartPriceProps) {
  const [isAddConfirmModalOpen, setAddConfirmModalOpen] = React.useState(false);
  const [isAddCartSuccessModalOpen, setAddCartSuccessModalOpen] =
    React.useState<boolean>(false);

  const handleOpenAddConfirmModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
      <a
        className="button button--red button--big product-container__button"
        href="#!"
        onClick={handleOpenAddConfirmModal}
      >
        Добавить в корзину
      </a>
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

export default GuitarCartPrice;
