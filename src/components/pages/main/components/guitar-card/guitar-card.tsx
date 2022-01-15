import React from 'react';
import { Link } from 'react-router-dom';

import type { Guitar } from '../../../../../types/guitar';

const starsItems = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
];

function GuitarCard({ name, previewImg, rating, price }: Guitar) {
  console.log(previewImg);
  return (
    <div className="product-card">
      <img alt={name} height="190" src={previewImg} width="75" />
      <div className="product-card__info">
        <div aria-hidden="true" className="rate product-card__rate">
          <span className="visually-hidden">Рейтинг:</span>
          {starsItems.map(({ id, value }) => (
            <svg aria-hidden="true" height="11" width="12" key={id}>
              <use xlinkHref={`${rating >= value ? '#icon-full-star' : '#icon-star'}`} />
            </svg>
          ))}
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
        <Link className="button button--mini" to="/">
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
