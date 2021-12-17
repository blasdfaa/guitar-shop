import React from 'react';
import { Link } from 'react-router-dom';

import type { Guitar } from '../../types/guitar';

function GuitarCard({ name, previewImg, rating, price }: Guitar) {
  return (
    <div className="product-card">
      <img alt={name} height="190" src={previewImg} width="75" />
      <div className="product-card__info">
        <div aria-hidden="true" className="rate product-card__rate">
          <span className="visually-hidden">Рейтинг:</span>
          <svg aria-hidden="true" height="11" width="12">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg aria-hidden="true" height="11" width="12">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg aria-hidden="true" height="11" width="12">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg aria-hidden="true" height="11" width="12">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg aria-hidden="true" height="11" width="12">
            <use xlinkHref="#icon-star" />
          </svg>
          <span className="rate__count">{rating}</span>
          <span className="rate__message" />
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to="/">
          Подробнее
        </Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">
          Купить
        </a>
      </div>
    </div>
  );
}

export default GuitarCard;
