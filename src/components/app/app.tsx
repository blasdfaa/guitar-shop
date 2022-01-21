import { Route, Routes } from 'react-router-dom';

import SvgSprite from '../svg-sprite/svg-sprite';
import Main from '../pages/main/main';
import ProductScreen from '../pages/product-screen/product-screen';
import CartScreen from '../pages/cart-screen/cart-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import { AppRoute } from '../../constants';

function App(): JSX.Element {
  return (
    <>
      <SvgSprite />
      <div className="wrapper">
        <Routes>
          <Route path={AppRoute.Home} element={<Main />} />
          <Route path={AppRoute.GuitarPage} element={<ProductScreen />} />
          <Route path={AppRoute.Cart} element={<CartScreen />} />
          <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
