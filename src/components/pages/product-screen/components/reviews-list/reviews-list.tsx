import React from 'react';

import ProductReviewItem from '../product-review-item/product-review-item';
import UpButton from '../up-button/up-button';

import type { GuitarReview } from '../../../../../types/review';

type ReviewsListProps = {
  reviews: GuitarReview[];
  onClickSendReview: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const DEFAULT_DISPLAYED_REVIEWS_COUNT = 3;
const DISPLAYED_REVIEWS_COUNT_STEP = 3;

function ReviewsList({ reviews = [], onClickSendReview }: ReviewsListProps) {
  const [reviewsToShow, setReviewsToShow] = React.useState(DEFAULT_DISPLAYED_REVIEWS_COUNT);

  const showMoreBtnRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (isElementVisible(showMoreBtnRef)) {
      handleShowMoreReviews();
    }
  };

  const isElementVisible = (ref: React.MutableRefObject<HTMLElement | null>): boolean | void => {
    if (ref.current) {
      const element = ref.current;
      const coords = element.getBoundingClientRect();
      const windowHeight = document.documentElement.clientHeight;

      const topVisible = coords.top > 0 && coords.top < windowHeight;
      const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

      return topVisible || bottomVisible;
    }
  };

  const handleShowMoreReviews = (): void => {
    setReviewsToShow((prevCount) => prevCount + DISPLAYED_REVIEWS_COUNT_STEP);
  };

  const isAllReviewsShown = reviewsToShow >= reviews.length;
  const isReviewsEmpty = !reviews.length;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#!"
        onClick={onClickSendReview}
      >
        Оставить отзыв
      </a>
      {!isReviewsEmpty &&
        reviews
          .slice(0, reviewsToShow)
          .map((comments) => <ProductReviewItem key={comments.id} {...comments} />)}
      {!isAllReviewsShown && (
        <button
          className="button button--medium reviews__more-button"
          onClick={handleShowMoreReviews}
          ref={showMoreBtnRef}
        >
          Показать еще отзывы
        </button>
      )}
      {isReviewsEmpty && <p>Отзывов пока нет.</p>}
      {!isReviewsEmpty && <UpButton />}
    </section>
  );
}

export default ReviewsList;
