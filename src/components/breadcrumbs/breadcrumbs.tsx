import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import useTypedSelector from '../../hooks/use-typed-selector';
import { selectGuitarProductName } from '../../store/product/product.selector';
import { getPageNameByRoute } from '../../utils/breadcrumbs';

type BreadcrumbsProps = {
  className: string;
};

function Breadcrumbs({ className }: BreadcrumbsProps) {
  const { pathname } = useLocation();

  const productName = useTypedSelector(selectGuitarProductName);

  const pathnames = pathname.split('/').filter((route) => route);

  return (
    <ul
      className={`breadcrumbs page-content__breadcrumbs ${className}`}
      data-testid="breadcrumbs-list"
    >
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
        const routeName = getPageNameByRoute(path);
        const isProductPage = productName && routeName === 'Неизвестно';

        return (
          <li className="breadcrumbs__item" key={path}>
            {isLastPath && (
              <a className="link">{isProductPage ? productName : routeName}</a>
            )}
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
