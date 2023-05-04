import { RootState } from "features/store";
import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const account = useSelector((state: RootState) => {
    return state.account;
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="is-full-width flex flex-row justify-center items-center">
        {account.user ? (
          <div>
            현재 로그인 중
            <div>
              {account.user !== null ? (
                Object.entries(account.user).map(([key, val]) => {
                  return (
                    <div key={key}>
                      <span>
                        <b>{key}</b>
                      </span>
                      : <span>{val}</span>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
