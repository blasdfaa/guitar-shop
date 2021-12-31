import React from 'react';

function Breadcrumbs() {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs" data-testid="breadcrumbs-list">
      <li className="breadcrumbs__item">
        <a className="link" href="/">
          Главная
        </a>
      </li>
      <li className="breadcrumbs__item">
        <a className="link">Каталог</a>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
