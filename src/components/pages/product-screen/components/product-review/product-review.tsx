import { formatReviewDate } from '../../../../../utils/date';
import RatingStars from '../../../../rating-stars/rating-stars';

import type { GuitarReview } from '../../../../../types/review';

function ProductReview({ userName, createAt, advantage, disadvantage, comment, rating }: GuitarReview) {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{formatReviewDate(createAt)}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <span className="visually-hidden">Рейтинг:</span>
        <RatingStars rating={rating} />
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default ProductReview;
