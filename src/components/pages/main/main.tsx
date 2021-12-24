import React from 'react';

import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CatalogFilter from '../../catalog-filter/catalog-filter';
import CatalogSort from '../../catalog-sort/catalog-sort';
import MainLayout from '../../main-layout/main-layout';
import GuitarList from '../../guitar-list/guitar-list';

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
