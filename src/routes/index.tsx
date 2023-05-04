import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LayoutDefault from "layouts/Default";

import Login from "views/Login";
import { useSelector } from "react-redux";
import { RootState } from "features/store";

const Dashboard = lazy(() => import("views/Dashboard"));
const ContentType = lazy(() => import("views/ContentType"));
const Content = lazy(() => import("views/Content"));
const ContentDetail = lazy(() => import("views/ContentDetail"));
const ContentAdd = lazy(() => import("views/ContentAdd"));

export const route = {
  login: {
    path: "",
    element: <Login />,
    absPath: "/admin",
    isNav: true,
    needAuth: false,
  },

  dashboard: {
    path: "dashboard",
    element: <Dashboard />,
    absPath: "/admin/dashboard",
    isNav: true,
    needAuth: true,
  },
  content: {
    path: "content",
    element: <Content />,
    absPath: "/admin/content",
    isNav: true,
    needAuth: true,
  },
  contentAdd: {
    path: "content/add",
    element: <ContentAdd />,
    absPath: "/admin/content/add",
    isNav: true,
    needAuth: true,
  },
  contentDetail: {
    path: "content/:contentId",
    element: <ContentDetail />,
    absPath: "/admin/content/:contentId",
    isNav: false,
    needAuth: true,
  },
  contentType: {
    path: "content-type",
    element: <ContentType />,
    absPath: "/admin/content-type",
    isNav: true,
    needAuth: true,
  },
};

const Router = () => {
  const account = useSelector((state: RootState) => {
    return state.account;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<LayoutDefault />}>
          {Object.values(route).map((elem) => {
            if (elem.needAuth && account.token === null) {
              return null;
            }

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
          <Route path={"*"} element={<div>404 NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
