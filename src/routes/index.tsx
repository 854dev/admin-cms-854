import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutDefault from 'layouts/Default';
import Dashboard from 'views/Dashboard';
import Error404 from 'views/Error404';
import ContentType from 'views/ContentType';
import Content from 'views/Content';
import ContentDetail from 'views/ContentDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutDefault />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/content' element={<Content />} />
          <Route path='/content/:contentId' element={<ContentDetail />} />
          <Route path='/content-type' element={<ContentType />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
