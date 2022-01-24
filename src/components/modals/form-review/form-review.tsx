import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import RatingStarsControl from '../../rating-stars-control/rating-stars-control';
import ModalLayout from '../modal-layout/modal-layout';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import { postReview } from '../../../store/product/product.async';
import Alert from '../../alert/alert';
import WarningMessage from '../warning-message/warning-message';

import type { ReviewFormInputs } from '../../../types/review';

type FormReviewProps = {
  productId?: number;
  productName?: string;
  onReviewSuccess: () => void;
  onCloseForm: () => void;
  isFormReviewOpen: boolean;
};

function FormReview({
  productName,
  productId,
  onReviewSuccess,
  onCloseForm,
  isFormReviewOpen,
}: FormReviewProps) {
  const dispatch = useTypedDispatch();

  const [isAlertModalOpen, setAlertModalOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormInputs>({ mode: 'onChange' });

  const onSubmitReview = (data: ReviewFormInputs) => {
    if (productId) {
      const reviewData = { ...data, guitarId: productId };

      dispatch(postReview(reviewData))
        .unwrap()
        .then(() => {
          onCloseForm();
          onReviewSuccess();
        })
        .catch(handleShowAlertModal);
    }
  };

  const handleShowAlertModal = () => {
    setAlertModalOpen(true);
  };

  return (
    <ModalLayout onClose={onCloseForm} isShow={isFormReviewOpen}>
      <h2 className="modal__header modal__header--review title title--medium">
        Оставить отзыв
      </h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">
        {productName}
      </h3>
      <form className="form-review" onSubmit={handleSubmit(onSubmitReview)}>
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label
              className="form-review__label form-review__label--required"
              htmlFor="user-name"
            >
              <span>Ваше Имя</span>
            </label>
            <input
              className="form-review__input form-review__input--name"
              id="user-name"
              type="text"
              autoComplete="off"
              {...register('userName', {
                required: true,
                minLength: 1,
              })}
            />
            {errors.userName && <WarningMessage />}
          </div>
          <Controller
            control={control}
            name="rating"
            rules={{ required: true, min: 1 }}
            render={({ fieldState }) => (
              <RatingStarsControl fieldState={fieldState} onChangeFormState={setValue} />
            )}
          />
        </div>
        <label
          className="form-review__label form-review__label--required"
          htmlFor="advantages"
        >
          <span>Достоинства</span>
        </label>
        <input
          className="form-review__input"
          id="advantages"
          type="text"
          autoComplete="off"
          {...register('advantage', {
            required: true,
          })}
        />
        {errors.advantage && <WarningMessage />}
        <label
          className="form-review__label form-review__label--required"
          htmlFor="disadvantages"
        >
          <span>Недостатки</span>
        </label>
        <input
          className="form-review__input"
          id="disadvantages"
          type="text"
          autoComplete="off"
          {...register('disadvantage', {
            required: true,
          })}
        />
        {errors.disadvantage && <WarningMessage />}
        <label className="form-review__label form-review__label--required" htmlFor="comments">
          <span>Комментарий</span>
        </label>
        <textarea
          className="form-review__input form-review__input--textarea"
          id="comments"
          rows={10}
          autoComplete="off"
          {...register('comment', {
            required: true,
          })}
        />
        {errors.comment && <WarningMessage />}
        <button className="button button--medium-20 form-review__button" type="submit">
          Отправить отзыв
        </button>
      </form>
      <Alert isOpen={isAlertModalOpen} onClose={() => setAlertModalOpen(false)}>
        Ошибка! Нет доступа к серверу
      </Alert>
    </ModalLayout>
  );
}

export default FormReview;
