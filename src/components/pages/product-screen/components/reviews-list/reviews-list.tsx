import React from 'react';

import ProductReview from '../product-review/product-review';
import UpButton from '../up-button/up-button';

import type { GuitarReview } from '../../../../../types/review';

type ReviewsListProps = {
  reviews: GuitarReview[];
};

const DEFAULT_DISPLAYED_REVIEWS_COUNT = 3;
const DISPLAYED_REVIEWS_COUNT_STEP = 3;

function ReviewsList({ reviews = [] }: ReviewsListProps) {
  const [reviewsToShow, setReviewsToShow] = React.useState(DEFAULT_DISPLAYED_REVIEWS_COUNT);

  const handleShowMoreReviews = (): void => {
    setReviewsToShow((prevCount) => prevCount + DISPLAYED_REVIEWS_COUNT_STEP);
  };

  const isAllReviewsShown = reviewsToShow >= reviews.length;
  const isReviewsEmpty = !reviews.length;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#!">
        Оставить отзыв
      </a>
      {!isReviewsEmpty &&
        reviews.slice(0, reviewsToShow).map((comments) => <ProductReview key={comments.id} {...comments} />)}
      {!isAllReviewsShown && (
        <button className="button button--medium reviews__more-button" onClick={handleShowMoreReviews}>
          Показать еще отзывы
        </button>
      )}
      {isReviewsEmpty && <p>Отзывов пока нет.</p>}
      {!isReviewsEmpty && <UpButton />}
    </section>
  );
}

export default ReviewsList;
