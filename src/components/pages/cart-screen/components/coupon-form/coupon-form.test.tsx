import { fireEvent, screen, waitFor } from '@testing-library/react';

import CouponForm from './coupon-form';
import api from '../../../../../store/api';
import { renderWithContext } from '../../../../../utils/test-utils';
import { postPromocodeDiscount } from '../../../../../store/cart/cart.async';

describe('Component: CouponForm', () => {
  test('should render correctly', () => {
    renderWithContext(<CouponForm />);

    expect(
      screen.getByRole('heading', { level: 2, name: /Промокод на скидку/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Промокод/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Применить/i })).toBeInTheDocument();
  });
  test('should correctly change input value', () => {
    const expectedFakeCoupon = 'fake-coupon';

    renderWithContext(<CouponForm />);

    const couponInput = screen.getByRole('textbox', { name: /Промокод/i }) as HTMLInputElement;

    fireEvent.input(couponInput, { target: { value: expectedFakeCoupon } });

    expect(couponInput.value).toEqual(expectedFakeCoupon);
  });
  test('should render error message if coupon is invalid', async () => {
    jest.spyOn(api, 'post').mockRejectedValue({ data: undefined });
    const { store } = renderWithContext(<CouponForm />);

    const fakeCoupon = 'fake-coupon';
    const couponInput = screen.getByRole('textbox', { name: /Промокод/i });
    const couponPostButton = screen.getByRole('button', { name: /Применить/i });

    fireEvent.input(couponInput, { target: { value: fakeCoupon } });
    fireEvent.click(couponPostButton);

    await store.dispatch(postPromocodeDiscount({ coupon: fakeCoupon }));

    await waitFor(() => {
      expect(screen.getByTestId('coupon-error-message')).toBeInTheDocument();
    });
  });
  test('should render success message if coupon is invalid', async () => {
    const fakeCoupon = 'fake-coupon';

    jest.spyOn(api, 'post').mockResolvedValue({ data: fakeCoupon });
    const { store } = renderWithContext(<CouponForm />);

    const couponInput = screen.getByRole('textbox', { name: /Промокод/i });
    const couponPostButton = screen.getByRole('button', { name: /Применить/i });

    fireEvent.input(couponInput, { target: { value: fakeCoupon } });
    fireEvent.click(couponPostButton);

    await store.dispatch(postPromocodeDiscount({ coupon: fakeCoupon }));

    await waitFor(() => {
      expect(screen.getByTestId('coupon-success-message')).toBeInTheDocument();
    });
  });
  test('should not render error/success messages on first render component', () => {
    renderWithContext(<CouponForm />);

    expect(screen.queryByTestId('coupon-success-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('coupon-error-message')).not.toBeInTheDocument();
  });
});
