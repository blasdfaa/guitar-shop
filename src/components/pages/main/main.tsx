import React from 'react';

import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CatalogFilter from '../../catalog-filter/catalog-filter';
import CatalogSort from '../../catalog-sort/catalog-sort';
import Pagination from '../../pagination/pagination';
import MainLayout from '../../main-layout/main-layout';

function Main() {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <div className="cards catalog__cards">
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus Acoustics"
                  height="190"
                  src="./img/content/catalog-product-0.jpg"
                  srcSet="./img/content/catalog-product-0@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">9</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>
                    129 500 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="Честер Bass"
                  height="190"
                  src="./img/content/catalog-product-1.jpg"
                  srcSet="./img/content/catalog-product-1@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">9</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">Честер Bass</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>
                    51 100 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red-border button--mini button--in-cart" href="#">
                    В Корзине
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus"
                  height="190"
                  src="./img/content/catalog-product-2.jpg"
                  srcSet="./img/content/catalog-product-2@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">76</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">СURT Z30 Plus</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>9 700 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus Acoustics"
                  height="190"
                  src="./img/content/catalog-product-3.jpg"
                  srcSet="./img/content/catalog-product-3@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">9</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>
                    129 500 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus"
                  height="190"
                  src="./img/content/catalog-product-4.jpg"
                  srcSet="./img/content/catalog-product-4@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">76</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">СURT Z30 Plus</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>9 700 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="Честер Bass"
                  height="190"
                  src="./img/content/catalog-product-5.jpg"
                  srcSet="./img/content/catalog-product-5@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">9</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">Честер Bass</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>
                    51 100 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red-border button--mini button--in-cart" href="#">
                    В Корзине
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus Acoustics"
                  height="190"
                  src="./img/content/catalog-product-6.jpg"
                  srcSet="./img/content/catalog-product-6@2x.jpg 2x"
                  width="75"
                />
                <div className="product-card__info">
                  <div aria-hidden="true" className="rate product-card__rate">
                    <span className="visually-hidden">Рейтинг:</span>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <span className="rate__count">9</span>
                    <span className="rate__message"></span>
                  </div>
                  <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>
                    129 500 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus Acoustics"
                  height="190"
                  src="./img/content/catalog-product-7.jpg"
                  srcSet="./img/content/catalog-product-7@2x.jpg 2x"
                  width="75"
                />
                <div className="product-card__info">
                  <div aria-hidden="true" className="rate product-card__rate">
                    <span className="visually-hidden">Рейтинг:</span>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg aria-hidden="true" height="11" width="12">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <span className="rate__count">9</span>
                    <span className="rate__message"></span>
                  </div>
                  <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>
                    129 500 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
              <div className="product-card">
                <img
                  alt="СURT Z30 Plus"
                  height="190"
                  src="./img/content/catalog-product-8.jpg"
                  srcSet="./img/content/catalog-product-8@2x.jpg 2x"
                  width="75"
                />
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
                    <span className="rate__count">76</span>
                    <span className="rate__message" />
                  </div>
                  <p className="product-card__title">СURT Z30 Plus</p>
                  <p className="product-card__price">
                    <span className="visually-hidden">Цена:</span>9 700 ₽
                  </p>
                </div>
                <div className="product-card__buttons">
                  <a className="button button--mini" href="#">
                    Подробнее
                  </a>
                  <a className="button button--red button--mini button--add-to-cart" href="#">
                    Купить
                  </a>
                </div>
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Main;
