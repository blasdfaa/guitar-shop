import React from 'react';
import { Link } from 'react-router-dom';

import RatingStarsView from '../../../../rating-stars-view/rating-stars-view';
import { AppRoute } from '../../../../../constants';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import { guitarIsCartByIdSelector } from '../../../../../store/cart/cart.selector';
import AddCartConfirm from '../../../../modals/add-cart-confirm/add-cart-confirm';
import AddCartSuccess from '../../../../modals/add-cart-success/add-cart-success';

import type { CartGuitar, Guitar } from '../../../../../types/guitar';

function GuitarCard({
  name,
  previewImg,
  rating,
  price,
  id,
  comments,
  type,
  stringCount,
  vendorCode,
}: Guitar) {
  const [isConfirmModalOpen, setConfirmModalOpen] = React.useState<boolean>(false);
  const [isAddCartSuccessModalOpen, setAddCartSuccessModalOpen] = React.useState<boolean>(false);

  const isProductInCart = useTypedSelector((state) => guitarIsCartByIdSelector(state, id));

  const handleOpenConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const handleOpenSuccessModal = () => {
    setAddCartSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setAddCartSuccessModalOpen(false);
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

  return (
    <div className="product-card">
      <img alt={name} height="190" src={previewImg} width="75" />
      <div className="product-card__info">
        <div aria-hidden="true" className="rate product-card__rate">
          <span className="visually-hidden">Рейтинг:</span>
          <RatingStarsView rating={rating} />
          <span className="rate__count" data-testid="card-comments">
            {comments.length}
          </span>
          <span className="rate__message" />
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price" data-testid="card-price">
          <span className="visually-hidden">Цена:</span>
          {price && price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`/${id}`}>
          Подробнее
        </Link>
        {isProductInCart && (
          <Link
            to={AppRoute.Cart}
            className="button button--red-border button--mini button--in-cart"
          >
            В корзине
          </Link>
        )}
        {!isProductInCart && (
          <button
            className="button button--red button--mini button--add-to-cart"
            type="button"
            onClick={handleOpenConfirmModal}
          >
            Купить
          </button>
        )}
        {isConfirmModalOpen && (
          <AddCartConfirm
            {...cartProduct}
            onCloseConfirmModal={handleCloseConfirmModal}
            onOpenSuccessModal={handleOpenSuccessModal}
          />
        )}
        {isAddCartSuccessModalOpen && (
          <AddCartSuccess onCloseSuccessModal={handleCloseSuccessModal} />
        )}
      </div>
    </div>
  );
}

export default GuitarCard;
