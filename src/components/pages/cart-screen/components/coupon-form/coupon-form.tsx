import React from 'react';
import { useForm } from 'react-hook-form';

import useTypedDispatch from '../../../../../hooks/use-typed-dispatch';
import { postPromocodeDiscount } from '../../../../../store/cart/cart.async';

type FormValues = {
  coupon: string;
};

function CouponForm() {
  const dispatch = useTypedDispatch();

  const [isSubmitSuccessful, setSubmitSuccessful] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: 'onSubmit' });

  const onSubmitCoupon = async (data: FormValues) => {
    try {
      await dispatch(postPromocodeDiscount(data)).unwrap();

      setSubmitSuccessful(true);
    } catch {
      setError('coupon', { type: 'invalidValue' });
      setSubmitSuccessful(false);
    }
  };

  const onChangeCouponValue = () => {
    setSubmitSuccessful(false);
  };

  const isInvalidCoupon =
    errors.coupon?.type === 'required' || errors.coupon?.type === 'invalidValue';

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        autoComplete="off"
        className="coupon__form"
        id="coupon-form"
        method="post"
        action="/"
        onSubmit={handleSubmit(onSubmitCoupon)}
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            {...register('coupon', {
              required: true,
              minLength: 1,
              onChange: onChangeCouponValue,
            })}
          />
          {isInvalidCoupon && (
            <p className="form-input__message form-input__message--error">Неверный промокод</p>
          )}
          {isSubmitSuccessful && (
            <p className="form-input__message form-input__message--success">Промокод принят</p>
          )}
        </div>
        <button
          className="button button--big coupon__button"
          type="submit"
          disabled={isSubmitting}
        >
          Применить
        </button>
      </form>
    </div>
  );
}

export default CouponForm;
