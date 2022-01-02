import React from 'react';
import { useLocation } from 'react-router-dom';

import GuitarCard from '../guitar-card/guitar-card';
import Pagination from '../pagination/pagination';
import { fetchGuitarsWithParams } from '../../store/guitar/guitar.async';
import useTypedDispatch from '../../hooks/use-typed-dispatch';
import useTypedSelector from '../../hooks/use-typed-selector';
import { selectGuitarsItems, selectGuitarsTotalCount } from '../../store/guitar/guitar.selector';
import Alert from '../../alert/alert';

function GuitarList() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const { search } = useLocation();

  const dispatch = useTypedDispatch();

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const guitars = useTypedSelector(selectGuitarsItems);
  const totalGuitars = useTypedSelector(selectGuitarsTotalCount);

  React.useEffect(() => {
    dispatch(fetchGuitarsWithParams(search)).unwrap().catch(handleShowModal);
  }, [search, dispatch]);

  return (
    <>
      <div className="cards catalog__cards">
        {guitars.length ? (
          guitars.map((item) => (
            <React.Fragment key={item.id}>
              <GuitarCard {...item} />
            </React.Fragment>
          ))
        ) : (
          <p className="title title--bigger">Товары не найдены</p>
        )}
      </div>
      <Pagination totalGuitars={totalGuitars} />
      <Alert isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        Ошибка! Нет доступа к серверу
      </Alert>
    </>
  );
}

export default GuitarList;
