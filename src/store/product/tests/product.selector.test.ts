import { ProductSliceState } from '../../../types/state';
import {
  guitarsReviewsSelector,
  selectGuitarProduct,
  selectGuitarProductName,
  selectGuitarReviews,
  selectProductLoadingStatus,
} from '../product.selector';
import { RootState } from '../../store';
import { generateGuitarItem, generateGuitarReview, getStateWithItems } from '../../../utils/mocks';
import { FetchDataStatus } from '../../../constants';
import { sortReviewsByDateFromNewToOld } from '../../../utils/date';

describe('Selectors: product', () => {
  describe('selectGuitarProduct', () => {
    test('should return product data', () => {
      const { comments, ...expectedProduct } = generateGuitarItem();
      const PRODUCT: ProductSliceState = getStateWithItems(undefined, undefined, expectedProduct).PRODUCT;
      const result = selectGuitarProduct({ PRODUCT } as RootState);

      expect(result).toEqual(expectedProduct);
    });
  });

  describe('selectGuitarReviews', () => {
    test('should return reviews data', () => {
      const expectedReview = [generateGuitarReview(), generateGuitarReview()];
      const PRODUCT: ProductSliceState = getStateWithItems(undefined, expectedReview).PRODUCT;
      const result = selectGuitarReviews({ PRODUCT } as RootState);

      expect(result).toEqual(expectedReview);
    });
  });

  describe('selectGuitarProductName', () => {
    test('should return product name', () => {
      const { comments, ...expectedProduct } = generateGuitarItem();
      const PRODUCT: ProductSliceState = getStateWithItems(undefined, undefined, expectedProduct).PRODUCT;
      const result = selectGuitarProductName({ PRODUCT } as RootState);

      expect(result).toEqual(expectedProduct.name);
    });
  });

  describe('selectProductLoadingStatus', () => {
    test('should return pending product loading status if product data is empty', () => {
      const PRODUCT: ProductSliceState = getStateWithItems().PRODUCT;
      const result = selectProductLoadingStatus({ PRODUCT } as RootState);

      expect(result).toEqual(FetchDataStatus.Idle);
    });
  });

  describe('guitarsReviewsSelector', () => {
    test('should return sorted reviews', () => {
      const expectedReview = [
        generateGuitarReview(),
        generateGuitarReview(),
        generateGuitarReview(),
        generateGuitarReview(),
      ];
      const expectedSortedReviews = expectedReview.sort(sortReviewsByDateFromNewToOld);
      const PRODUCT: ProductSliceState = getStateWithItems(undefined, expectedReview).PRODUCT;
      const result = guitarsReviewsSelector({ PRODUCT } as RootState);

      expect(result).toEqual(expectedSortedReviews);
    });
    test('should not compute again with same state', () => {
      const mockReviews = [generateGuitarReview(), generateGuitarReview(), generateGuitarReview()];
      const PRODUCT: ProductSliceState = getStateWithItems(undefined, mockReviews).PRODUCT;

      guitarsReviewsSelector.resetRecomputations();
      guitarsReviewsSelector({ PRODUCT } as RootState);
      expect(guitarsReviewsSelector.recomputations()).toEqual(1);
      guitarsReviewsSelector({ PRODUCT } as RootState);
      guitarsReviewsSelector({ PRODUCT } as RootState);
      guitarsReviewsSelector({ PRODUCT } as RootState);
      expect(guitarsReviewsSelector.recomputations()).toEqual(1);
    });
    test('should compute if state has changed', () => {
      const mockReviews = [generateGuitarReview(), generateGuitarReview(), generateGuitarReview()];
      const PRODUCT: ProductSliceState = getStateWithItems(undefined, mockReviews).PRODUCT;

      guitarsReviewsSelector.resetRecomputations();
      guitarsReviewsSelector({ PRODUCT } as RootState);
      expect(guitarsReviewsSelector.recomputations()).toEqual(1);
      PRODUCT.reviews.data = [...mockReviews, ...mockReviews];
      guitarsReviewsSelector({ PRODUCT } as RootState);
      expect(guitarsReviewsSelector.recomputations()).toEqual(2);
      PRODUCT.reviews.data = [...mockReviews, ...mockReviews];
      guitarsReviewsSelector({ PRODUCT } as RootState);
      expect(guitarsReviewsSelector.recomputations()).toEqual(3);
    });
  });
});
