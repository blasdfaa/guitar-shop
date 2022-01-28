import React from 'react';

import AddCartConfirm from '../../../../modals/add-cart-confirm/add-cart-confirm';
import AddCartSuccess from '../../../../modals/add-cart-success/add-cart-success';
import { guitarIsCartByIdSelector } from '../../../../../store/cart/cart.selector';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import { AppRoute } from '../../../../../constants';
import { increaseProductQuantity } from '../../../../../store/cart/cart.slice';
import useTypedDispatch from '../../../../../hooks/use-typed-dispatch';

import type { CartGuitar } from '../../../../../types/guitar';

type GuitarPriceInfoProps = {
  guitar: CartGuitar;
};

function GuitarPriceInfo({ guitar }: GuitarPriceInfoProps) {
  const dispatch = useTypedDispatch();

  const [isAddConfirmModalOpen, setAddConfirmModalOpen] = React.useState(false);
  const [isAddCartSuccessModalOpen, setAddCartSuccessModalOpen] = React.useState<boolean>(false);

  const isGuitarInCart = useTypedSelector((state) => {
    if (!guitar) return false;

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

  const handleIncreaseQuantity = () => {
    if (guitar?.id && isGuitarInCart) {
      dispatch(increaseProductQuantity(guitar.id));
    }
  };

  return (
    <div className="product-container__price-wrapper">
      <p className="product-container__price-info product-container__price-info--title">Цена:</p>
      <p className="product-container__price-info product-container__price-info--value">
        {guitar?.price && guitar.price.toLocaleString()} ₽
      </p>
      <button
        className="button button--red button--big product-container__button"
        onClick={handleOpenAddConfirmModal}
      >
        Добавить в корзину
      </button>
      {guitar && isAddConfirmModalOpen && (
        <AddCartConfirm
          {...guitar}
          onCloseConfirmModal={handleCloseAddConfirmModal}
          onOpenSuccessModal={handleOpenAddCartSuccessModal}
          // Передать функцию для увеличения количества только в случае если товар уже есть в коризне
          onConfirmButtonCustomCallback={isGuitarInCart ? handleIncreaseQuantity : undefined}
        />
      )}
      {isAddCartSuccessModalOpen && (
        <AddCartSuccess
          routeAfterSuccess
          routeTo={AppRoute.Home}
          onCloseSuccessModal={handleCloseAddCartSuccessModal}
        />
      )}
    </div>
  );
}

export default GuitarPriceInfo;
