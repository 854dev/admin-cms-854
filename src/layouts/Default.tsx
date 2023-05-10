import { Outlet } from "react-router-dom";
import TopBar from "layouts/partials/TopBar";
import useInitFetch from "hooks/useInitFetch";
import useTokenValidate from "hooks/useTokenValidate";
import { useEffect } from "react";

const LayoutDefault = () => {
  const [isValid] = useTokenValidate();

  /**
   * 접속 path에 관계없이 api 초기화를 한번은 호출해야 함
   */
  useInitFetch();

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
