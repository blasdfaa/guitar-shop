import { generateGuitarItem, generateGuitarReview, getStateWithItems } from '../../../utils/mocks';
import productReducer from '../product.slice';
import { FetchDataStatus } from '../../../constants';
import { fetchProductById, postReview } from '../product.async';
import { ProductSliceState } from '../../../types/state';

describe('Reducer: product', () => {
  describe('fetchProductById', () => {
    test('should change state while pending action', () => {
      const { comments, ...mockProduct } = generateGuitarItem();
      const action = { type: fetchProductById.pending.type };
      const expectedState: ProductSliceState = {
        data: mockProduct,
        status: FetchDataStatus.Idle,
        reviews: {
          data: comments,
          status: FetchDataStatus.Idle,
        },
      };
      const initialState: ProductSliceState = {
        data: mockProduct,
        status: FetchDataStatus.Success,
        reviews: {
          data: comments,
          status: FetchDataStatus.Success,
        },
      };
      const state = productReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
    test('should change state while fulfilled action', () => {
      const { comments, ...mockProduct } = generateGuitarItem();
      const action = { type: fetchProductById.fulfilled.type, payload: { comments, ...mockProduct } };
      const expectedState: ProductSliceState = {
        data: mockProduct,
        status: FetchDataStatus.Success,
        reviews: {
          data: comments,
          status: FetchDataStatus.Success,
        },
      };
      const initialState = getStateWithItems().PRODUCT;
      const state = productReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
    test('should change state while rejected action', () => {
      const action = { type: fetchProductById.rejected.type };
      const expectedState: ProductSliceState = {
        data: null,
        status: FetchDataStatus.Failed,
        reviews: {
          data: [],
          status: FetchDataStatus.Failed,
        },
      };
      const initialState = getStateWithItems().PRODUCT;
      const state = productReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
  });
  describe('postReview', () => {
    test('should change state while pending action', () => {
      const { comments, ...mockProduct } = generateGuitarItem();
      const mockReviews = [generateGuitarReview(), generateGuitarReview(), generateGuitarReview()];
      const action = { type: postReview.pending.type };
      const expectedState: ProductSliceState = {
        data: mockProduct,
        status: FetchDataStatus.Success,
        reviews: {
          data: mockReviews,
          status: FetchDataStatus.Idle,
        },
      };
      const initialState: ProductSliceState = {
        data: mockProduct,
        status: FetchDataStatus.Success,
        reviews: {
          data: mockReviews,
          status: FetchDataStatus.Success,
        },
      };
      const state = productReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
    test('should change state while fulfilled action', () => {
      const expectedReview = generateGuitarReview();
      const action = { type: postReview.fulfilled.type, payload: expectedReview };
      const expectedState: ProductSliceState = {
        data: null,
        status: FetchDataStatus.Idle,
        reviews: {
          data: [expectedReview],
          status: FetchDataStatus.Success,
        },
      };
      const initialState = getStateWithItems().PRODUCT;
      const state = productReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
    test('should change state while rejected action', () => {
      const action = { type: postReview.rejected.type };
      const expectedState: ProductSliceState = {
        data: null,
        status: FetchDataStatus.Idle,
        reviews: {
          data: [],
          status: FetchDataStatus.Failed,
        },
      };
      const initialState = getStateWithItems().PRODUCT;
      const state = productReducer(initialState, action);

      expect(state).toEqual(expectedState);
    });
  });
  test('should return initial state when get empty action', () => {
    const expectedState = getStateWithItems().PRODUCT;
    const initialState = undefined;
    const action = { type: '' };
    const result = productReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });
});
