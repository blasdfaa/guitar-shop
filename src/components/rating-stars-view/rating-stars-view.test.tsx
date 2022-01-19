import RatingStarsView from './rating-stars-view';
import { renderWithContext } from '../../utils/test-utils';
import { screen } from '@testing-library/react';

const RATING_STARS_COUNT = 5;
const MAX_RATING_VALUE = 5;
const STARS_ICON_HREF = '#icon-star';
const FILLED_STARS_ICON_HREF = '#icon-full-star';

describe('Component: RatingStarsView', () => {
  test('should render correctly', () => {
    renderWithContext(<RatingStarsView />);

    const stars = screen.getAllByTestId('star-icon');
    expect(stars.length).toEqual(RATING_STARS_COUNT);
  });
  test('should render empty stars if rating is undefined', () => {
    renderWithContext(<RatingStarsView />);

    const stars = screen.getAllByTestId('star-icon');
    stars.forEach((star) => {
      expect(star).toHaveAttribute('href', STARS_ICON_HREF);
    });
  });
  test('should render filled stars if rating is max', () => {
    renderWithContext(<RatingStarsView rating={MAX_RATING_VALUE} />);

    const stars = screen.getAllByTestId('star-icon');

    stars.forEach((star) => {
      expect(star).toHaveAttribute('href', FILLED_STARS_ICON_HREF);
    });
  });
});
