import { BrowserRouter, Routes, Route, RouteProps, PathRouteProps } from 'react-router-dom';

import LayoutDefault from 'layouts/Default';
import Dashboard from 'views/Dashboard';
import Error404 from 'views/Error404';
import ContentType from 'views/ContentType';
import Content from 'views/Content';
import ContentDetail from 'views/ContentDetail';
import ContentAdd from 'views/ContentAdd';
import ContentEnum from 'views/ContentEnum';

export const route = {
  dashboard: { path: '', element: <Dashboard />, absPath: '/admin' },
  content: { path: 'content', element: <Content />, absPath: '/admin/content' },
  contentEnum: {
    path: 'content/enum',
    element: <ContentEnum />,
    absPath: '/admin/content/enum',
  },
  contentAdd: { path: 'content/add', element: <ContentAdd />, absPath: '/admin/content/add' },
  contentDetail: {
    path: 'content/:contentId',
    element: <ContentDetail />,
    absPath: '/admin/content/:contentId',
  },
  contentType: {
    path: 'content-type',
    element: <ContentType />,
    absPath: '/admin/content-type',
  },
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='admin' element={<LayoutDefault />}>
          {Object.values(route).map((elem) => {
            return <Route key={elem.path} path={elem.path} element={elem.element} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
