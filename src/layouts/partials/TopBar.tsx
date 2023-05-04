import { RootState } from "features/store";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { route } from "routes";

const TopBar = () => {
  const location = useLocation();

  const account = useSelector((state: RootState) => {
    return state.account;
  });

  if (!account.token) {
    return null;
  }

  return (
    <header className="top-bar disable-scrollbars">
      <nav className="tabs">
        {Object.entries(route).map(([key, value]) => {
          if (!value.isNav) return null;

          return (
            <Link
              to={value.absPath}
              key={key}
              className={location.pathname === value.absPath ? "active" : ""}
            >
              {key}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default TopBar;
