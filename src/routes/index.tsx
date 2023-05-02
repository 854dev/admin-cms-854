import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LayoutDefault from "layouts/Default";

import useInitFetch from "hooks/useInitFetch";

const Dashboard = lazy(() => import("views/Dashboard"));
const ContentType = lazy(() => import("views/ContentType"));
const Content = lazy(() => import("views/Content"));
const ContentDetail = lazy(() => import("views/ContentDetail"));
const ContentAdd = lazy(() => import("views/ContentAdd"));

export const route = {
  dashboard: {
    path: "",
    element: <Dashboard />,
    absPath: "/admin",
    isNav: true,
  },
  content: {
    path: "content",
    element: <Content />,
    absPath: "/admin/content",
    isNav: true,
  },
  contentAdd: {
    path: "content/add",
    element: <ContentAdd />,
    absPath: "/admin/content/add",
    isNav: true,
  },
  contentDetail: {
    path: "content/:contentId",
    element: <ContentDetail />,
    absPath: "/admin/content/:contentId",
    isNav: false,
  },
  contentType: {
    path: "content-type",
    element: <ContentType />,
    absPath: "/admin/content-type",
    isNav: true,
  },
};

const Router = () => {
  const { contentTypeList } = useInitFetch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<LayoutDefault />}>
          {Object.values(route).map((elem) => {
            return (
              <Route
                key={elem.path}
                path={elem.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    {elem.element}
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
