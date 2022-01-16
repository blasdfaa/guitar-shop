import { Link } from 'react-router-dom';

import RatingStars from '../../../../rating-stars/rating-stars';

import type { Guitar } from '../../../../../types/guitar';

function GuitarCard({ name, previewImg, rating, price, id }: Guitar) {
  return (
    <div className="product-card">
      <img alt={name} height="190" src={previewImg} width="75" />
      <div className="product-card__info">
        <div aria-hidden="true" className="rate product-card__rate">
          <span className="visually-hidden">Рейтинг:</span>
          <RatingStars rating={rating} />
          <span className="rate__count" data-testid="card-comments">
            0
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
        <Link className="button button--red button--mini button--add-to-cart" to="/">
          Купить
        </Link>
      </div>
    </div>
  );
}

export default GuitarCard;
