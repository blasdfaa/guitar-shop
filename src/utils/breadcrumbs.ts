import { AppRoute } from '../constants';

export const getPageNameByRoute = (route: string): string => {
  const routes = {
    [AppRoute.Home]: 'Главная',
    [AppRoute.Cart]: 'Корзина',
  } as { [key: string]: string };

  return routes[route] || 'Неизвестно';
};
