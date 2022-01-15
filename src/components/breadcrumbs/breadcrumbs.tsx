import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const { pathname } = useLocation();

  const pathnames = pathname.split('/').filter((route) => route);

  return (
    <ul className="breadcrumbs page-content__breadcrumbs" data-testid="breadcrumbs-list">
      <li className="breadcrumbs__item">
        <Link className="link" to="/">
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to="/">
          Каталог
        </Link>
      </li>
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLastPath = index === pathnames.length - 1;

        return (
          <li className="breadcrumbs__item" key={path}>
            {isLastPath && <a className="link">{path}</a>}
            {!isLastPath && (
              <Link className="link" to={routeTo}>
                {path}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumbs;
