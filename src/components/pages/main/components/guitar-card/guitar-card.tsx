import { Link } from 'react-router-dom';

import RatingStarsView from '../../../../rating-stars-view/rating-stars-view';
import useTypedDispatch from '../../../../../hooks/use-typed-dispatch';
import { addProductToCart } from '../../../../../store/cart/cart.slice';
import { AppRoute } from '../../../../../constants';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import { guitarFromCartByIdSelector } from '../../../../../store/cart/cart.selector';

import type { CartProduct, Guitar } from '../../../../../types/guitar';

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
  const dispatch = useTypedDispatch();

  const isProductInCart = useTypedSelector((state) =>
    guitarFromCartByIdSelector(state, id),
  );

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
          {price} ₽
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
            onClick={handleAddToCart}
          >
            Купить
          </button>
        )}
      </div>
    </div>
  );
}

export default GuitarCard;
