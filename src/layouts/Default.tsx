import { Outlet } from "react-router-dom";
import TopBar from "layouts/partials/TopBar";
import { useEffect } from "react";
import useTokenValidate from "hooks/useTokenValidate";
import useInitFetch from "hooks/useInitFetch";

const LayoutDefault = () => {
  const { isValid, logout } = useTokenValidate();

  useInitFetch(isValid !== "VALID");

  useEffect(() => {
    if (isValid === "INVALID") {
      logout();
    }
  }, [isValid]);

  return (
    <div className="container">
      <TopBar />
      <Outlet />
    </div>
  );
};

export default LayoutDefault;
