import { useState } from "react";
import api from "api/api_rtk";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/accountSlice";
import { useNavigate } from "react-router-dom";
import { route } from "routes";
import { RootState } from "features/store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => {
    return state.account;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading }] = api.usePostLoginMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();

      // 토큰, 사용자정보 등록
      dispatch(setUser(res));

      // 요청이 성공했을 때 /admin/dashboard 로 이동
      navigate(route.dashboard.path);
    } catch (error: any) {
      setErrorMessage(error.data?.message || "Unknown error");
    }
  };

  return (
    <div className="is-full-width flex flex-row justify-center items-center">
      {account.user ? (
        <div>현재 로그인 중 : {account.user.username}</div>
      ) : (
        <></>
      )}

      <form onSubmit={handleSubmit} hidden={account.user !== null}>
        <h1>Log in</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" className="p-4 my-4" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
