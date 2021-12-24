import React from 'react';
import { useLocation } from 'react-router-dom';

import GuitarCard from '../guitar-card/guitar-card';
import { useGetAllGuitarsQuery } from '../../store/guitar/guitar.api';
import Pagination from '../pagination/pagination';

function GuitarList() {
  const { search } = useLocation();

  const { data } = useGetAllGuitarsQuery(search);

  const totalGuitars = data?.totalCount;

  return (
    <>
      <div className="cards catalog__cards">
        {data?.guitars.length ? (
          data?.guitars.map((item) => (
            <React.Fragment key={item.id}>
              <GuitarCard {...item} />
            </React.Fragment>
          ))
        ) : (
          <p className="title title--bigger">Товары не найдены</p>
        )}
      </div>
      <Pagination totalGuitars={totalGuitars} />
    </>
  );
}

export default GuitarList;
