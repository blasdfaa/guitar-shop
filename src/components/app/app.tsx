import { Route, Routes } from 'react-router-dom';

import Main from '../pages/main/main';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import SvgSprite from '../svg-sprite/svg-sprite';

function App(): JSX.Element {
  return (
    <>
      <SvgSprite />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
