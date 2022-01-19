import ProductReviewItem from './product-review-item';
import { generateGuitarReview } from '../../../../../utils/mocks';
import { renderWithContext } from '../../../../../utils/test-utils';
import { screen } from '@testing-library/react';

describe('Component: ProductReviewItem', () => {
  const mockReviewItem = generateGuitarReview();

  test('should render correctly', () => {
    const RATING_STARS_COUNT = 5;
    renderWithContext(<ProductReviewItem {...mockReviewItem} />);

    const ratingStars = screen.getAllByTestId('rating-stars');

    expect(screen.getByRole('heading', { level: 4, name: mockReviewItem.userName })).toBeInTheDocument();
    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(ratingStars.length).toEqual(RATING_STARS_COUNT);
    ratingStars.forEach((star) => {
      expect(star).toHaveAttribute('aria-hidden', 'true');
    });

    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText(mockReviewItem.advantage)).toBeInTheDocument();

    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText(mockReviewItem.disadvantage)).toBeInTheDocument();

    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
    expect(screen.getByText(mockReviewItem.comment)).toBeInTheDocument();
  });
});
