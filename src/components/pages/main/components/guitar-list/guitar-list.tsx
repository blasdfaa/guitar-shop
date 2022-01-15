import React from 'react';
import { useLocation } from 'react-router-dom';

import Pagination from '../pagination/pagination';
import { fetchGuitarsWithParams } from '../../../../../store/guitar/guitar.async';
import useTypedDispatch from '../../../../../hooks/use-typed-dispatch';
import useTypedSelector from '../../../../../hooks/use-typed-selector';
import {
  selectGuitarsItems,
  selectGuitarsLoadingStatus,
  selectGuitarsTotalCount,
} from '../../../../../store/guitar/guitar.selector';
import Alert from '../../../../alert/alert';
import { FetchDataStatus } from '../../../../../constants';
import Loader from '../../../../loader/loader';
import GuitarCard from '../guitar-card/guitar-card';

function GuitarList() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const { search } = useLocation();

  const dispatch = useTypedDispatch();

  const guitars = useTypedSelector(selectGuitarsItems);
  const totalGuitars = useTypedSelector(selectGuitarsTotalCount);
  const guitarsLoadingStatus = useTypedSelector(selectGuitarsLoadingStatus);

  React.useEffect(() => {
    dispatch(fetchGuitarsWithParams(search)).unwrap().catch(handleShowMessageModal);
  }, [search, dispatch]);

  const handleShowMessageModal = () => {
    setModalOpen(true);
  };

  const isGuitarsDataLoading = guitarsLoadingStatus === FetchDataStatus.Idle;
  const hasGuitarsData = guitarsLoadingStatus === FetchDataStatus.Success && guitars.length > 0;
  const isGuitarsEmpty =
    (guitarsLoadingStatus === FetchDataStatus.Success && guitars.length === 0) ||
    (guitarsLoadingStatus === FetchDataStatus.Failed && guitars.length === 0);

  return (
    <>
      <div
        className={`cards catalog__cards ${isGuitarsDataLoading ? 'cards--loaded' : ''} ${
          isGuitarsEmpty ? 'cards--empty' : ''
        }`}
      >
        {hasGuitarsData &&
          guitars.map((item) => (
            <React.Fragment key={item.id}>
              <GuitarCard {...item} />
            </React.Fragment>
          ))}
        {isGuitarsDataLoading && <Loader className="cards__loader" />}
        {isGuitarsEmpty && <p className="title title--bigger cards__empty-text">Товары не найдены</p>}
      </div>
      <Pagination totalGuitars={totalGuitars} />
      <Alert isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        Ошибка! Нет доступа к серверу
      </Alert>
    </>
  );
}

export default GuitarList;
