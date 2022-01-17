import React from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import ReviewsList from './components/reviews-list/reviews-list';
import ProductsTabs from './components/products-tabs/products-tabs';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import useTypedSelector from '../../../hooks/use-typed-selector';
import { fetchProductById } from '../../../store/product/product.async';
import { guitarsReviewsSelector, selectGuitarProduct } from '../../../store/product/product.selector';
import FormReview from '../../modals/form-review/form-review';
import RatingStarsView from '../../rating-stars-view/rating-stars-view';

function ProductScreen() {
  const dispatch = useTypedDispatch();
  const { guitarId } = useParams();

  const [isReviewSendModalOpen, setReviewSendModalOpen] = React.useState(false);

  const guitarProduct = useTypedSelector(selectGuitarProduct);
  const guitarReviews = useTypedSelector(guitarsReviewsSelector);

  React.useEffect(() => {
    if (guitarId) {
      dispatch(fetchProductById(+guitarId));
    }
  }, [guitarId]);

  const handleCloseReviewSendModal = () => {
    setReviewSendModalOpen(false);
  };

  const handleShowReviewSendModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setReviewSendModalOpen(true);
  };

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар {guitarProduct?.name} </h1>
          <Breadcrumbs />
          <div className="product-container">
            <img
              className="product-container__img"
              src={guitarProduct?.previewImg}
              srcSet={`${guitarProduct?.previewImg} 2x`}
              width="90"
              height="235"
              alt={guitarProduct?.name}
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                {guitarProduct?.name}
              </h2>
              <div className="rate product-container__rating" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                <RatingStarsView rating={guitarProduct?.rating} />
                <span className="rate__count">{guitarReviews.length}</span>
                <span className="rate__message"></span>
              </div>
              <ProductsTabs
                description={guitarProduct?.description}
                stringCount={guitarProduct?.stringCount}
                vendorCode={guitarProduct?.vendorCode}
                type={guitarProduct?.type}
              />
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">
                {guitarProduct?.price}
              </p>
              <a className="button button--red button--big product-container__button" href="#!">
                Добавить в корзину
              </a>
            </div>
          </div>
          <ReviewsList reviews={guitarReviews} onClickSendReview={handleShowReviewSendModal} />
        </div>
      </main>
      {isReviewSendModalOpen && (
        <FormReview
          productName={guitarProduct?.name}
          productId={guitarProduct?.id}
          onClose={handleCloseReviewSendModal}
        />
      )}
    </MainLayout>
  );
}

export default ProductScreen;
