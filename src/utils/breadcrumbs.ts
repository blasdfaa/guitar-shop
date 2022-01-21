import { AppRoute } from '../constants';

export const getPageNameByRoute = (route: string): string => {
  const routes = {
    [AppRoute.Home]: 'Главная',
    [AppRoute.Cart]: 'Корзина',
  };

  return routes[route as AppRoute] || 'Неизвестно';
};
