import { fireEvent, screen } from '@testing-library/react';

import ReviewsList from './reviews-list';
import { renderWithContext } from '../../../../../utils/test-utils';
import { generateGuitarReview } from '../../../../../utils/mocks';

describe('Component: ReviewsList', () => {
  test('should render reviews correctly', () => {
    const expectedReviews = [generateGuitarReview(), generateGuitarReview(), generateGuitarReview()];
    const sendReview = jest.fn();

    renderWithContext(<ReviewsList reviews={expectedReviews} onClickSendReview={sendReview} />);

    expect(screen.getByRole('heading', { level: 3, name: 'Отзывы' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Оставить отзыв' })).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item').length).toEqual(expectedReviews.length);
  });
  test('should render up button if there are more than 3 reviews', () => {
    const expectedReviews = [generateGuitarReview(), generateGuitarReview(), generateGuitarReview()];
    const sendReview = jest.fn();

    renderWithContext(<ReviewsList reviews={expectedReviews} onClickSendReview={sendReview} />);

    expect(screen.getByRole('link', { name: 'Наверх' })).toBeInTheDocument();
  });
  test('should not render the up button if there are less than 3 reviews', () => {
    const expectedReviews = [generateGuitarReview(), generateGuitarReview()];
    const sendReview = jest.fn();

    renderWithContext(<ReviewsList reviews={expectedReviews} onClickSendReview={sendReview} />);

    expect(screen.queryByRole('link', { name: 'Наверх' })).not.toBeInTheDocument();
  });
  test('should render the show more button if there are more than 3 reviews', () => {
    const expectedReviews = [
      generateGuitarReview(),
      generateGuitarReview(),
      generateGuitarReview(),
      generateGuitarReview(),
    ];
    const sendReview = jest.fn();

    renderWithContext(<ReviewsList reviews={expectedReviews} onClickSendReview={sendReview} />);

    expect(screen.getByRole('button', { name: 'Показать еще отзывы' })).toBeInTheDocument();
  });
  test('should call a callback when scrolling reviews', async () => {
    const expectedReviews = [
      generateGuitarReview(),
      generateGuitarReview(),
      generateGuitarReview(),
      generateGuitarReview(),
      generateGuitarReview(),
    ];
    const sendReview = jest.fn();
    window.addEventListener = jest.fn();
    const onScroll = jest.spyOn(window, 'addEventListener');

    renderWithContext(<ReviewsList reviews={expectedReviews} onClickSendReview={sendReview} />);

    const showMoreButton = screen.getByRole('button', { name: 'Показать еще отзывы' });

    fireEvent.scroll(window, { target: { scrollY: showMoreButton.getBoundingClientRect() } });
    expect(onScroll).toHaveBeenCalled();
  });
});
