import React from 'react';
import { Link } from 'react-router-dom';

import MainLayout from '../../main-layout/main-layout';

function NotFoundScreen() {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <div className="error-page">
            <h1 className="page-content__title title title--bigger">404</h1>
            <p className="error-page__message">
              Ищете что-то интересное на нашем сайте? К сожалению, страница, которую Вы запрашиваете, не
              существует…
            </p>
            <Link className="button button--mini error-page__link" to="/">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default NotFoundScreen;
