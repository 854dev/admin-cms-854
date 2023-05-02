import { Outlet } from "react-router-dom";
import TopBar from "layouts/partials/TopBar";

const LayoutDefault = () => {
  return (
    <>
      <div className="container">
        <TopBar />
        <Outlet />
      </div>
    </>
  );
};

export default LayoutDefault;
