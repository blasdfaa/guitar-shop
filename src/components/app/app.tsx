import { Route, Routes } from 'react-router-dom';

import SvgSprite from '../svg-sprite/svg-sprite';
import Main from '../pages/main/main';
import ProductScreen from '../pages/product-screen/product-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <>
      <SvgSprite />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path=":productId" element={<ProductScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
