import guitarReducer, { GuitarSliceState, setGuitarsCount } from '../guitar.slice';
import { FetchDataStatus } from '../../../constants';
import { generateGuitarItem } from '../../../utils/mocks';
import { fetchGuitarsWithParams } from '../guitar.async';

describe('Reducer: guitarReducer', () => {
  test('should return initial state when get empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = guitarReducer(initialState, action);

    expect(result).toEqual({
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 0,
    });
  });
  test('should set fetch status while pending action', () => {
    const action = { type: fetchGuitarsWithParams.pending.type };
    const initialState: GuitarSliceState = {
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 0,
    };

    const state = guitarReducer(initialState, action);

    expect(state).toEqual({ ...initialState, status: FetchDataStatus.Idle, guitarsTotalCount: 0, items: [] });
  });
  test('should set fetch status while fulfilled action', () => {
    const fakeGuitars = [generateGuitarItem(), generateGuitarItem()];
    const action = { type: fetchGuitarsWithParams.fulfilled.type, payload: fakeGuitars };
    const initialState: GuitarSliceState = {
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 0,
    };

    const state = guitarReducer(initialState, action);

    expect(state).toEqual({ ...initialState, status: FetchDataStatus.Success, items: fakeGuitars });
  });
  test('should set fetch status while rejected action', () => {
    const action = { type: fetchGuitarsWithParams.rejected.type };
    const initialState: GuitarSliceState = {
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 0,
    };

    const state = guitarReducer(initialState, action);

    expect(state).toEqual({ ...initialState, status: FetchDataStatus.Failed, items: [] });
  });
  test('should set guitar count when get setGuitarsCount action', () => {
    const initialState = undefined;
    const action = setGuitarsCount(10);
    const result = guitarReducer(initialState, action);

    expect(result).toEqual({
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 10,
    });
  });
  test('should overwrite guitar count when get setGuitarsCount action if there is already a guitar count', () => {
    const initialState = {
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 10,
    };
    const action = setGuitarsCount(999);
    const result = guitarReducer(initialState, action);

    expect(result).toEqual({
      items: [],
      status: FetchDataStatus.Idle,
      guitarsTotalCount: 999,
    });
  });
});
