import React from 'react';

import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CatalogFilter from '../../catalog-filter/catalog-filter';
import CatalogSort from '../../catalog-sort/catalog-sort';
import Pagination from '../../pagination/pagination';
import MainLayout from '../../main-layout/main-layout';
import { useGetAllGuitarsQuery, useGetGuitarByNameQuery } from '../../../store/guitar/guitar.api';
import useTypedSelector from '../../../hooks/use-typed-selector';
import { getSearchedGuitar } from '../../../store/searched-guitar/searched-guitar.selector';
import GuitarList from '../../guitar-list/guitar-list';

import type { Guitar } from '../../../types/guitar';

function Main() {
  const [guitarCards, setGuitarCards] = React.useState<Guitar[] | undefined>([]);

  useGetAllGuitarsQuery();

  const searchedGuitar = useTypedSelector(getSearchedGuitar);

  const { data } = useGetGuitarByNameQuery(searchedGuitar);

  React.useEffect(() => {
    setGuitarCards(data);
  }, [data]);

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          {searchedGuitar && guitarCards?.length === 0 && <h1>Товары не найдены</h1>}
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
