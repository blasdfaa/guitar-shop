import { useSearchParams } from 'react-router-dom';

type ChangeParams = <T extends string | number = string>(key: string, value: T) => void;

const paramInstance = new URLSearchParams();

type UseUpdateSearchParamsResult = {
  searchParams: typeof paramInstance;
  updateSearchParams: ChangeParams;
  deleteSearchParam: (key: string) => void;
};

const useUpdateSearchParams = (): UseUpdateSearchParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams: ChangeParams = (key, value): void => {
    searchParams.set(key, value.toString());
    setSearchParams(searchParams);
  };

  const deleteSearchParam = (key: string): void => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return { searchParams, updateSearchParams, deleteSearchParam };
};

export default useUpdateSearchParams;
