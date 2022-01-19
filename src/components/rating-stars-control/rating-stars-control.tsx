import React from 'react';
import { ControllerFieldState, UseFormSetValue } from 'react-hook-form';

import type { ReviewFormInputs } from '../../types/review';

type RatingStarsControlProps = {
  fieldState: ControllerFieldState;
  onChangeFormState: UseFormSetValue<ReviewFormInputs>;
};

const starsItems = [
  { id: 'star-5', value: 5, title: 'Отлично' },
  { id: 'star-4', value: 4, title: 'Хорошо' },
  { id: 'star-3', value: 3, title: 'Нормально' },
  { id: 'star-2', value: 2, title: 'Плохо' },
  { id: 'star-1', value: 1, title: 'Ужасно' },
];

const DEFAULT_RATING_VALUE = 0;

function RatingStarsControl({ fieldState, onChangeFormState }: RatingStarsControlProps) {
  const [ratingValue, setRatingValue] = React.useState(DEFAULT_RATING_VALUE);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingValue(+e.target.value);
    onChangeFormState('rating', +e.target.value);
  };

  return (
    <div data-testid="rating-stars-control">
      <span className="form-review__label form-review__label--required">
        <span>Ваша Оценка</span>
      </span>
      <div className="rate rate--reverse">
        {starsItems.map(({ id, title, value }) => (
          <React.Fragment key={id}>
            <input
              className="visually-hidden"
              type="radio"
              id={id}
              value={value}
              onChange={handleRatingChange}
              checked={value === ratingValue}
            />
            <label className="rate__label" htmlFor={id} title={title} />
          </React.Fragment>
        ))}
        {fieldState.error && <span className="rate__message">Поставьте оценку</span>}
      </div>
    </div>
  );
}

export default RatingStarsControl;
