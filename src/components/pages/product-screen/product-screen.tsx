import React from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import ReviewsList from './components/reviews-list/reviews-list';
import ProductsTabs from './components/products-tabs/products-tabs';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import useTypedSelector from '../../../hooks/use-typed-selector';
import { fetchProductById } from '../../../store/product/product.async';
import {
  guitarsReviewsSelector,
  selectProductLoadingStatus,
  selectGuitarProduct,
} from '../../../store/product/product.selector';
import FormReview from '../../modals/form-review/form-review';
import RatingStarsView from '../../rating-stars-view/rating-stars-view';
import ReviewSuccess from '../../modals/review-success/review-success';
import { FetchDataStatus } from '../../../constants';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Alert from '../../alert/alert';
import GuitarCartPrice from '../main/components/guitar-cart-price/guitar-cart-price';

function ProductScreen() {
  const dispatch = useTypedDispatch();
  const { guitarId } = useParams();

  const [isReviewSendModalOpen, setReviewSendModalOpen] = React.useState(false);
  const [isReviewSuccessModalOpen, setReviewSuccessModalOpen] = React.useState(false);
  const [isAlertModalOpen, setAlertModalOpen] = React.useState(false);

  const guitarProduct = useTypedSelector(selectGuitarProduct);
  const guitarReviews = useTypedSelector(guitarsReviewsSelector);
  const guitarLoadingStatus = useTypedSelector(selectProductLoadingStatus);

  React.useEffect(() => {
    if (!guitarId) return;

    dispatch(fetchProductById(+guitarId))
      .unwrap()
      .catch(handleShowAlertModal);
  }, [guitarId, dispatch]);

  const handleShowReviewSendModal = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    setReviewSendModalOpen(true);
  };

  const handleCloseReviewSendModal = (): void => {
    setReviewSendModalOpen(false);
  };

  const handleShowReviewSuccessModal = (): void => {
    setReviewSuccessModalOpen(true);
  };

  const handleCloseReviewSuccessModal = (): void => {
    setReviewSuccessModalOpen(false);
  };

  const handleShowAlertModal = (): void => {
    setAlertModalOpen(true);
  };

  const isPageLoaded =
    guitarLoadingStatus === FetchDataStatus.Success ||
    guitarLoadingStatus === FetchDataStatus.Failed;

  if (isPageLoaded && guitarProduct === null) {
    return <NotFoundScreen />;
  }

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Товар {guitarProduct?.name}
          </h1>
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
                <span className="rate__count" data-testid="product-rate-count">
                  {guitarReviews.length}
                </span>
              </div>
              <ProductsTabs
                description={guitarProduct?.description}
                stringCount={guitarProduct?.stringCount}
                vendorCode={guitarProduct?.vendorCode}
                type={guitarProduct?.type}
              />
            </div>
            <GuitarCartPrice guitar={guitarProduct} />
          </div>
          <ReviewsList reviews={guitarReviews} onClickSendReview={handleShowReviewSendModal} />
        </div>
      </main>
      <FormReview
        productName={guitarProduct?.name}
        productId={guitarProduct?.id}
        onReviewSuccess={handleShowReviewSuccessModal}
        onCloseForm={handleCloseReviewSendModal}
        isFormReviewOpen={isReviewSendModalOpen}
      />
      <ReviewSuccess
        onCloseModal={handleCloseReviewSuccessModal}
        isFormReviewSuccessOpen={isReviewSuccessModalOpen}
      />
      <Alert isOpen={isAlertModalOpen} onClose={() => setAlertModalOpen(false)}>
        Ошибка! Нет доступа к серверу
      </Alert>
    </MainLayout>
  );
}

export default ProductScreen;
