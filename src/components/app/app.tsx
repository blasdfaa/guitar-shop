import { Route, Routes } from 'react-router-dom';

import SvgSprite from '../svg-sprite/svg-sprite';
import Main from '../pages/main/main';
import ErrorPage from '../pages/error-page/error-page';

function App(): JSX.Element {
  return (
    <>
      <SvgSprite />
      <div className="wrapper">
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'*'} element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
