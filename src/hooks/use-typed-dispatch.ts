import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';

const useTypedDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default useTypedDispatch;
