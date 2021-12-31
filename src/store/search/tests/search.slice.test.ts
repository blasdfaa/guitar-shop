import searchReducer, { SearchSliceState } from '../search.slice';
import { FetchDataStatus } from '../../../constants';
import { fetchGuitarsByName } from '../search.async';
import { generateGuitarItem } from '../../../utils/mocks';

describe('Reducer: searchReducer', () => {
  test('should return initial state when get empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = searchReducer(initialState, action);

    expect(result).toEqual({
      guitars: {
        data: [],
        status: FetchDataStatus.Idle,
      },
    });
  });
  test('should set fetch status while pending action', () => {
    const action = { type: fetchGuitarsByName.pending.type };
    const initialState: SearchSliceState = {
      guitars: {
        data: [],
        status: FetchDataStatus.Idle,
      },
    };

    const state = searchReducer(initialState, action);

    expect(state).toEqual({ ...initialState, guitars: { status: FetchDataStatus.Idle, data: [] } });
  });
  test('should set fetch status while fulfilled action', () => {
    const fakeGuitars = [generateGuitarItem(), generateGuitarItem()];
    const action = { type: fetchGuitarsByName.fulfilled.type, payload: fakeGuitars };
    const initialState: SearchSliceState = {
      guitars: {
        data: [],
        status: FetchDataStatus.Idle,
      },
    };

    const state = searchReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      guitars: { status: FetchDataStatus.Success, data: fakeGuitars },
    });
  });
  test('should set fetch status while rejected action', () => {
    const action = { type: fetchGuitarsByName.rejected.type };
    const initialState: SearchSliceState = {
      guitars: {
        data: [],
        status: FetchDataStatus.Idle,
      },
    };

    const state = searchReducer(initialState, action);

    expect(state).toEqual({ ...initialState, guitars: { status: FetchDataStatus.Failed, data: [] } });
  });
});
