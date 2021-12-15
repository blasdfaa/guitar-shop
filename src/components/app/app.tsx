import { Route, Routes } from 'react-router-dom';

import SvgSprite from '../svg-sprite/svg-sprite';
import Main from '../pages/main/main';

function App(): JSX.Element {
  return (
    <>
      <SvgSprite />
      <div className="wrapper">
        <Routes>
          <Route path={'/'} element={<Main />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
