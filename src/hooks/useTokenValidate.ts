import React, { useEffect, useState } from "react";
import api from "api/api_rtk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "features/store";
import { resetUser } from "features/accountSlice";
import { route } from "routes";

type TokenValidationStatus =
  | "DEFAULT"
  | "NO_TOKEN"
  | "FETCHING"
  | "VALID"
  | "INVALID";

function useTokenValidate(disableFetch?: boolean) {
  const dispatch = useDispatch();

  const account = useSelector((state: RootState) => {
    return state.account;
  });

  const [tokenValidationTrigger, tokenValidationResult] =
    api.usePostTokenValidateMutation();

  const tokenValidate = async () => {
    try {
      if (!account.token) {
        return;
      }

      const res = await tokenValidationTrigger({}).unwrap();
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    if (!disableFetch) {
      tokenValidate();
    }
  }, []);

  const getTokenValidationStatus: () => TokenValidationStatus = () => {
    // 토큰 없음
    if (account.token === null) {
      return "NO_TOKEN";
    }

    // 페칭 중
    if (tokenValidationResult.isLoading) {
      return "FETCHING";
    }

    // 유효
    if (tokenValidationResult.isSuccess) {
      return "VALID";
    }

    // 유효하지 않음
    if (tokenValidationResult.isError) {
      return "INVALID";
    }

    // 기본값
    return "DEFAULT";
  };

  /** 로그아웃 처리 */
  const logout = () => {
    // 토큰, 사용자정보 비우기
    dispatch(resetUser());

    // 스토리지 비우기
    window.localStorage.clear();
    window.sessionStorage.clear();

    // 로그인 페이지로
    window.location.href = route.login.path;
  };

  return {
    isValid: getTokenValidationStatus(),
    logout,
    account,
  };
}

export default useTokenValidate;
