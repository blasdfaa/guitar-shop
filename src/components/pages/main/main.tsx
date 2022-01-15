import React from 'react';

import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CatalogFilter from './components/catalog-filter/catalog-filter';
import GuitarList from './components/guitar-list/guitar-list';
import CatalogSort from './components/catalog-sort/catalog-sort';
import MainLayout from '../../main-layout/main-layout';

function Main() {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            <GuitarList />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Main;
