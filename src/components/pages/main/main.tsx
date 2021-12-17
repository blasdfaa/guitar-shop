import React from 'react';

import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CatalogFilter from '../../catalog-filter/catalog-filter';
import CatalogSort from '../../catalog-sort/catalog-sort';
import Pagination from '../../pagination/pagination';
import MainLayout from '../../main-layout/main-layout';
import GuitarList from '../../guitar-list/guitar-list';
import { useGetAllGuitarsQuery } from '../../../store/guitar/guitar.api';

import type { Guitar } from '../../../types/guitar';
import { getOrderType, getSortingType } from '../../../store/catalog/catalog.selector';
import useTypedSelector from '../../../hooks/use-typed-selector';
import useTypedDispatch from '../../../hooks/use-typed-dispatch';
import { setMaxGuitarPrice, setMinGuitarPrice } from '../../../store/catalog/catalog.slice';

function Main() {
  const dispatch = useTypedDispatch();

  const [guitarCards, setGuitarCards] = React.useState<Guitar[] | undefined>([]);

  const selectedSortType = useTypedSelector(getSortingType);
  const selectedOrderType = useTypedSelector(getOrderType);

  const { data: guitarData } = useGetAllGuitarsQuery({
    sortType: selectedSortType,
    order: selectedOrderType,
  });

  const { minPrice, maxPrice } = useGetAllGuitarsQuery(
    {
      sortType: selectedSortType,
      order: selectedOrderType,
    },
    {
      selectFromResult: ({ data }) => ({
        minPrice: data && Math.min(...data.map((guitar) => guitar.price)),
        maxPrice: data && Math.max(...data.map((guitar) => guitar.price)),
      }),
    },
  );

  React.useEffect(() => {
    setGuitarCards(guitarData);
  }, [guitarData]);

  React.useEffect(() => {
    if (minPrice && maxPrice) {
      dispatch(setMinGuitarPrice(minPrice));
      dispatch(setMaxGuitarPrice(maxPrice));
    }
  }, [minPrice, maxPrice]);

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <GuitarList items={guitarCards} />
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Main;
